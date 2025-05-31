import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function getSubscriptionProductsWithPrices() {
  try {
    const products = await stripe.products.list({
      active: true,
      limit: 10,
    });

    const productsWithPrices = await Promise.all(
      products.data.map(async (product) => {
        const prices = await stripe.prices.list({
          product: product.id,
          active: true,
          type: 'recurring',
        });

        return {
          ...product,
          prices: prices.data,
        };
      })
    );

    // Sort prices for each product (e.g., by amount) if necessary, or filter for a specific price if multiple exist
    // For simplicity, we'll just return the first recurring price found for each product for now.
    const sortedProducts = productsWithPrices
    .map(product => ({
        ...product,
        prices: product.prices.sort((a, b) => a.unit_amount! - b.unit_amount!)
    }))
    .filter(product => product.prices.length > 0)
    .sort((a, b) => a.prices[0].unit_amount! - b.prices[0].unit_amount!)

    return sortedProducts;

  } catch (error) {
    console.error('Error fetching Stripe products and prices:', error);
    return [];
  }
} 