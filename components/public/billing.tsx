"use client";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { createClientSupabaseClient } from "@/lib/supabase/client";
import { StripeProduct, UserPlan } from "@/lib/stripe/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getApi, postApi } from '@/lib/fetch';
import { useToast } from "@/hooks/use-toast";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function Plans({
  label = "Choose your plan",
  productList = undefined,
}: {
  label?: string;
  productList?: StripeProduct[];
}) {
  const [products, setProducts] = useState<StripeProduct[]>(productList || []);
  const [loading, setLoading] = useState(true);
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!productList) {
          const { data, error } = await getApi<{ products: StripeProduct[] }>("/api/stripe/plans");
          if (error) throw new Error(error);
          if (data?.products) setProducts(data.products);
        }

        // Fetch user plan from Supabase
        const supabase = createClientSupabaseClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;
        
        setUserPlan({
          planId: "",
          priceId: "",
          status: "",
          currentPeriodEnd: 0,
        });

        if (user?.user_metadata?.plan) {
          setUserPlan(user.user_metadata.plan);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [productList]);

  const handleSubscribe = async (priceId: string) => {
    setSubmitting(priceId);
    console.log({ priceId });

    try {
      const { data, error } = await postApi<{ sessionId: string }>("/api/stripe/checkout", { priceId });
      
      if (error) {
        throw new Error(error);
      }

      if (!data?.sessionId) {
        throw new Error("No session ID received");
      }

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to initialize");

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      if (stripeError) throw new Error(stripeError.message);
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process subscription",
        variant: "destructive",
      });
    } finally {
      setSubmitting(null);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center w-full min-h-[300px]">
        <Loader2 className="w-10 h-10 mx-auto animate-spin" />
      </div>
    );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">{label}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover mb-4 rounded"
                />
              )}
              <ul className="space-y-2">
                {product.prices.map((price) => (
                  <li key={price.id} className="flex justify-between">
                    <span>
                      {price.unit_amount
                        ? `$${(price.unit_amount / 100).toFixed(2)} / ${
                            price.interval
                          }`
                        : "Free"}
                    </span>
                    {userPlan?.priceId === price.id &&
                    userPlan.status === "active" ? (
                      <span className="text-green-600 font-semibold">
                        Current Plan
                      </span>
                    ) : (
                      <>
                        {userPlan && (
                          <Button
                            onClick={() => handleSubscribe(price.id)}
                            disabled={submitting === price.id}
                            variant={
                              userPlan?.priceId === price.id
                                ? "outline"
                                : "default"
                            }
                          >
                            {submitting === price.id
                              ? "Loading..."
                              : userPlan?.priceId === price.id
                              ? "Manage"
                              : "Subscribe"}
                          </Button>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {/* Add additional footer content if needed */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
