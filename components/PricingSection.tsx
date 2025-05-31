'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils"; // Assuming a utility for formatting currency
import Link from "next/link"; // Assuming checkout will be handled via a link or form

interface Price {
  id: string;
  unit_amount: number | null;
  currency: string;
  recurring: { interval: string } | null;
}

export interface ProductWithPrices {
  id: string;
  name: string;
  description: string | null;
  prices: Price[];
}

interface PricingSectionProps {
  products: ProductWithPrices[];
}

export default function PricingSection({ products }: PricingSectionProps) {
  if (!products || products.length === 0) {
    return null; // Or display a loading/error message
  }

  return (
    <section id="pricing" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <Card key={product.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {product.prices.map(price => (
                  <div key={price.id} className="text-2xl font-bold">
                    {formatCurrency(price.unit_amount! / 100, price.currency)} / {price.recurring?.interval}
                  </div>
                ))}
                {/* Add features list here */}
                <ul className="mt-4 space-y-2">
                  {/* Example Feature */}
                  {/* <li>Feature 1</li> */}
                </ul>
              </CardContent>
              <CardFooter>
                {/* Link/Button to initiate checkout for this price. This will need to be connected to your Stripe checkout logic. */}
                <Link href={`/checkout?priceId=${product.prices[0]?.id}`} passHref>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 