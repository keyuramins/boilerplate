import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { UserPlan } from "@/lib/stripe/types";

// Disable Next.js body parser to get raw body for Stripe webhook
export const config = {
  api: {
    bodyParser: false,
  },
};

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

export async function POST(request: NextRequest) {
  // Get raw body as Buffer
  let rawBody: Buffer;
  try {
    rawBody = await getRawBody(request);
  } catch (error) {
    console.error("Raw body error:", error.message);
    return new NextResponse("Failed to read request body", { status: 400 });
  }

  // Get Stripe signature header
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    console.error("Missing Stripe signature");
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  // Verify webhook signature
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", {
      message: error.message,
      signature,
    });
    return new NextResponse(
      `Webhook signature verification failed: ${error.message}`,
      {
        status: 400,
      }
    );
  }

  // Access Supbse with Admin privileges
  const supabase = await createServerSupabaseClient(true);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const subscriptionId = session.subscription as string;

        if (!userId || !subscriptionId) {
          console.error("Missing userId or subscriptionId", {
            userId,
            subscriptionId,
          });
          return new NextResponse("Missing userId or subscriptionId", {
            status: 400,
          });
        }

        // Fetch subscription details
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );
        if (!subscription.items.data[0]?.price?.product) {
          console.error("Invalid subscription data", { subscriptionId });
          return new NextResponse("Invalid subscription data", { status: 400 });
        }

        const plan: UserPlan = {
          planId: subscription.items.data[0].price.product as string,
          priceId: subscription.items.data[0].price.id,
          status: subscription.status,
          currentPeriodEnd: subscription.current_period_end,
        };

        // Fetch existing user metadata to preserve other fields
        const { data: user, error: userError } =
          await supabase.auth.admin.getUserById(userId);
        if (userError || !user.user) {
          console.error("Failed to fetch user from Supabase:", {
            userId,
            error: userError?.message,
          });
          return new NextResponse("Failed to fetch user", { status: 500 });
        }

        // Merge existing metadata with new plan, preserving other fields
        const existingMetadata = user.user.user_metadata || {};
        const updatedMetadata = {
          ...existingMetadata,
          plan,
        };

        // Update user metadata in Supabase
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          userId,
          {
            user_metadata: updatedMetadata,
          }
        );

        if (updateError) {
          console.error("Failed to update user metadata:", {
            userId,
            error: updateError.message,
          });
          return new NextResponse("Failed to update user plan", {
            status: 500,
          });
        }

        console.log(`Successfully updated plan for user ${userId}`);
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (!userId) {
          console.error("Missing userId in subscription metadata", {
            subscriptionId: subscription.id,
          });
          return new NextResponse("Missing userId", { status: 400 });
        }

        // Fetch existing user metadata to preserve other fields
        const { data: user, error: userError } =
          await supabase.auth.admin.getUserById(userId);
        if (userError || !user.user) {
          console.error("Failed to fetch user from Supabase:", {
            userId,
            error: userError?.message,
          });
          return new NextResponse("Failed to fetch user", { status: 500 });
        }

        // Prepare updated plan data
        const plan: UserPlan = {
          planId: subscription.items.data[0]?.price?.product as string,
          priceId: subscription.items.data[0]?.price?.id,
          status: subscription.status,
          currentPeriodEnd: subscription.current_period_end,
        };

        // Merge existing metadata with new plan
        const existingMetadata = user.user.user_metadata || {};
        const updatedMetadata = {
          ...existingMetadata,
          plan,
        };

        // Update user metadata in Supabase
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          userId,
          {
            user_metadata: updatedMetadata,
          }
        );

        if (updateError) {
          console.error("Failed to update user metadata:", {
            userId,
            error: updateError.message,
          });
          return new NextResponse("Failed to update user plan", {
            status: 500,
          });
        }

        console.log(
          `Successfully updated plan for user ${userId} on ${event.type}`
        );
        break;
      }

      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }

    return new NextResponse("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", {
      eventType: event.type,
      message: error.message,
      stack: error.stack,
    });
    return new NextResponse(`Webhook processing error: ${error.message}`, {
      status: 500,
    });
  }
}
