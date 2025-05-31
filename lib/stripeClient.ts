// Stripe client setup for browser-side usage (Stripe.js)
// For server-side, use Stripe secret key in API routes only

// TODO: Implement Stripe client logic for payment flows
// Example: import { loadStripe } from '@stripe/stripe-js';
// export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!); 

import Stripe from 'stripe';

/**
 * Stripe client instance for server-side operations.
 * Uses the Stripe secret key.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

/**
 * Retrieves active Stripe products with their associated prices.
 *
 * @returns {Promise<Array<Stripe.Product & { prices: Stripe.Price[] }>>} A promise that resolves to an array of products with prices.
 */
export async function getStripeProductsWithPrices() {
  const products = await stripe.products.list({ active: true });
  const prices = await stripe.prices.list({ active: true });
  return products.data.map(product => ({
    ...product,
    prices: prices.data.filter(price => price.product === product.id),
  }));
}

/**
 * Creates a Stripe Checkout session for a new subscription.
 *
 * @param {object} params - Parameters for creating the checkout session.
 * @param {string} params.priceId - The ID of the Stripe price.
 * @param {string} params.customerEmail - The customer's email address.
 * @param {string} params.successUrl - The URL to redirect to after successful payment.
 * @param {string} params.cancelUrl - The URL to redirect to after payment cancellation.
 * @param {string} [params.customerId] - The ID of the existing Stripe customer.
 * @param {Record<string, any>} [params.metadata] - Optional metadata to attach to the session and subscription.
 * @returns {Promise<Stripe.Checkout.Session>} A promise that resolves to the created checkout session.
 */
export async function createStripeCheckoutSession({
  priceId,
  customerEmail,
  successUrl,
  cancelUrl,
  customerId,
  metadata,
}: {
  priceId: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
  customerId?: string;
  metadata?: Record<string, any>;
}) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: customerEmail,
    customer: customerId,
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    metadata: {
      sub: metadata?.customerId,
      customerEmail: metadata?.customerEmail,
      ...metadata,
    },
    subscription_data: { metadata: {
      sub: metadata?.customerId,
      customerEmail: metadata?.customerEmail,
      ...metadata,
    } },
  });
} 