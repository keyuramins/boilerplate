"use client";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { createClientSupabaseClient } from "@/lib/supabase/client";
import { StripeProduct, UserPlan } from "@/lib/stripe/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function Plans({products=[]}: {products: StripeProduct[]}) {
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [submitting, setSubmitting] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user plan from Supabase
        const supabase = createClientSupabaseClient();
        const { data: { user } } = await supabase.auth.getUser();
	//console.log(user)
	if(!user) return;
	if(user) {
	  setUserPlan({
	      planId: "",
	      priceId: "",
	      status: "",
	      currentPeriodEnd: 0
	  })
	}
        if (user && user?.user_metadata?.plan) {
          setUserPlan(user.user_metadata.plan);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleSubscribe = async (priceId: string) => {
    setSubmitting(priceId);
    console.log({priceId});	
    
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to create checkout session");
      }
      const { sessionId } = await res.json();
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to initialize");

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) throw new Error(error.message);
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Choose Your Plan</h1>
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
                        ? `$${(price.unit_amount / 100).toFixed(2)} / ${price.interval}`
                        : "Free"}
                    </span>
                    {userPlan?.priceId === price.id && userPlan.status === "active" ? (
                      <span className="text-green-600 font-semibold">Current Plan</span>
                    ) : (
		    <>
		    {
		      userPlan && (
			<Button
			  onClick={() => handleSubscribe(price.id)}
			  disabled={submitting === price.id}
			  variant={userPlan?.priceId === price.id ? "outline" : "default"}
			>
			  {submitting === price.id ? (
			    "Loading..."
			  ) : userPlan?.priceId === price.id ? (
			    "Manage"
			  ) : (
			    "Subscribe"
			  )}
			</Button>
		      )
		    }
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
