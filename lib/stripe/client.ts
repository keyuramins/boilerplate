import { stripe } from "@/lib/stripe/config";

export async function createCheckoutSession({
  userId,
  priceId,
  successUrl,
  cancelUrl,
}: {
  userId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { userId },
    });
    return session;
  } catch (error) {
    throw new Error(`Failed to create checkout session: ${error.message}`);
  }
}

export async function getProducts() {
  try {
    const products = await stripe.products.list({ active: true });
    const prices = await stripe.prices.list({ active: true });

    return products.data.map((product) => {
      const productPrices = prices.data.filter(
        (price) => price.product === product.id
      );
      return {
        id: product.id,
        name: product.name,
        description: product.description || "",
        image: product.images[0] || "",
        prices: productPrices.map((price) => ({
          id: price.id,
          unit_amount: price.unit_amount,
          currency: price.currency,
          interval: price.recurring?.interval,
        })),
      };
    });
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}
