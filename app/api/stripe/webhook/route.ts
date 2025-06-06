// app/api/stripe/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { Stripe } from 'stripe'
import { stripe } from '@/lib/stripeClient'
import { createClient } from '@supabase/supabase-js'
import { randomBytes } from 'crypto'
import { Buffer } from 'buffer'

export const runtime = 'nodejs'
export const config = {
  api: {
    bodyParser: false,
  },
}

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
console.log('endpointSecret', endpointSecret)
const supabaseUrl    = process.env.SUPABASE_URL || ''
console.log('supabaseUrl', supabaseUrl)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
console.log('serviceRoleKey', serviceRoleKey)

async function findUserByEmail(supabase: any, email: string) {
  let page = 1
  const perPage = 100
  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage })
    if (error) throw error
    const match = data.users.find((u: any) => u.email === email)
    if (match) return match
    if (data.users.length < perPage) break
    page++
  }
  return null
}

async function getRawBody(request: NextRequest): Promise<Buffer> {
  try {
    const chunks: Buffer[] = [];
    for await (const chunk of request.body as any) {
      chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
  } catch (error) {
    console.error("Error reading raw body:", error);
    throw new Error("Failed to read request body");
  }
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    console.error("Missing Stripe signature");
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }
  let event: Stripe.Event

  try {
    const rawBody = await getRawBody(req)
    console.log("rawBody length:", rawBody.length)
    console.log("signature:", signature)
    console.log("endpointSecret present:", !!endpointSecret)
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret)
  } catch (err: any) {
    console.error("Webhook verification failed:", err.message)
    return new NextResponse('Webhook verification failed', { status: 400 })
  }
  console.log('event.type', event.type)
  if (event.type === 'checkout.session.completed' || event.type === 'invoice.payment_succeeded') {
    const invoice          = event.data.object as Stripe.Invoice
    const metadata         = invoice.metadata || {}
    const supabaseUserId   = metadata.sub as string | undefined
    const email            = metadata.customerEmail as string
                          || invoice.customer_email as string
    const subscriptionId   = (invoice as any).subscription as string | undefined
    const name             = (invoice as any).customer_details?.name
                          || (invoice as any).billing_details?.name
                          || ''

    const supabase = createClient(supabaseUrl, serviceRoleKey)
    console.log('supabaseUserId', supabaseUserId)
    console.log('email', email)
    console.log('subscriptionId', subscriptionId)
    console.log('name', name)
    if (supabaseUserId) {
      console.log('supabaseUserId', supabaseUserId)
      const { data: getRes } = await supabase.auth.admin.getUserById(supabaseUserId)
      console.log('getRes', getRes)
      if (getRes.user) {
        console.log('getRes.user', getRes.user)
        await supabase.auth.admin.updateUserById(supabaseUserId, {
          user_metadata: {
            ...getRes.user.user_metadata,
            subscription: subscriptionId,
          },
        })
      }
      console.log('getRes.user', getRes.user)
    } else if (typeof email === 'string') {
      console.log('email', email)
      const existing = await findUserByEmail(supabase, email)
      if (existing) {
        console.log('existing', existing)
        await supabase.auth.admin.updateUserById(existing.id, {
          user_metadata: {
            ...existing.user_metadata,
            subscription: subscriptionId,
          },
        })
      } else {
        const randomPassword = randomBytes(12).toString('base64')
        console.log('randomPassword', randomPassword)
        await supabase.auth.admin.createUser({
          email,
          password: randomPassword,
          email_confirm: true,
          user_metadata: { full_name: name, subscription: subscriptionId },
        })
        console.log('inviteUserByEmail', email)
        await supabase.auth.admin.inviteUserByEmail(email)
      }
    }
  }

  // Handle subscription updates for cancelation
  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;
    const cancelAt = subscription.cancel_at_period_end ? subscription.cancel_at : null;
    const userId = subscription.metadata?.sub;
    const email = subscription.metadata?.customerEmail;
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    let user = null;
    if (userId) {
      const { data } = await supabase.auth.admin.getUserById(userId);
      user = data.user;
    } else if (email) {
      user = await findUserByEmail(supabase, email);
    }
    if (user) {
      const newUserMeta = { ...user.user_metadata };
      if (cancelAt) {
        newUserMeta.subscription_cancel_at = new Date(cancelAt * 1000).toISOString();
      } else {
        newUserMeta.subscription_cancel_at = null;
        newUserMeta.scheduled_account_deletion = null;
      }
      await supabase.auth.admin.updateUserById(user.id, {
        user_metadata: {
          ...newUserMeta,
          subscription: subscription.id,
        },
      });
    }
  }

  return NextResponse.json({ received: true })
}