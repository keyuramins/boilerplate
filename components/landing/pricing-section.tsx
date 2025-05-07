"use client";
import React, { useState, useEffect } from "react";
import { landingConfig } from "@/config/landing.config";
import { projectConfig } from "@/config/project.config";
import { CheckCircle2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { createClientSupabaseClient } from "@/lib/supabase/client";
import { StripeProduct, UserPlan } from "@/lib/stripe/types";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility for classNames
import { useToast } from "@/hooks/use-toast";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PricingSectionProps {
  productList?: StripeProduct[];
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  productList = [],
}) => {
  const config = landingConfig.sections.pricing;
  const variant = config.variant || landingConfig.globalVariant;

  const { toast } = useToast();
  const [products, setProducts] = useState<StripeProduct[]>(productList);
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [loading, setLoading] = useState(!productList.length); // Only load if no productList

  useEffect(() => {
    async function fetchData() {
      if (productList.length) return; // Skip fetch if productList is provided

      try {
        const fetchProducts = await fetch("/api/stripe/plans");
        const res = await fetchProducts.json();
        if (res?.products) setProducts(res?.products);

        // Fetch user plan from Supabase
        const supabase = await createClientSupabaseClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setUserPlan({
            planId: "",
            priceId: "",
            status: "",
            currentPeriodEnd: 0,
          });
          if (user?.user_metadata?.plan) {
            setUserPlan(user.user_metadata.plan);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSubscribe = async (priceId: string) => {
    setSubmitting(priceId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        toast({
          title: "Error",
          description: error || "Failed to create checkout session",
          variant: "destructive",
        });
        return;
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

  // Map Stripe products to pricing plans structure
  const pricingPlans = products.map((product) => ({
    name: product.name,
    price: product.prices[0]?.unit_amount
      ? `$${(product.prices[0].unit_amount / 100).toFixed(2)}`
      : product.name === "Enterprise"
      ? "Custom"
      : "$0",
    period: product.prices[0]?.interval ? `/${product.prices[0].interval}` : "",
    description: product.description || "Plan description",
    features: product.metadata?.features?.split(",") ||
      projectConfig.plans.find((p) => p.name === product.name)?.features || [
        "Example feature",
        "Example feature",
        "Example feature",
      ],
    cta:
      userPlan?.priceId === product.prices[0]?.id &&
      userPlan.status === "active"
        ? "Manage"
        : product.name === "Enterprise"
        ? "Contact Sales"
        : "Subscribe",
    popular:
      userPlan?.priceId === product.prices[0]?.id &&
      userPlan.status === "active"
        ? true
        : product.name.toLowerCase() === "free",
    priceId: product.prices[0]?.id,
  }));

  // Fallback to projectConfig.plans
  const fallbackPlans = projectConfig.plans.map((plan) => ({
    ...plan,
    popular:
      userPlan?.priceId && userPlan.status === "active"
        ? plan.priceId === userPlan.priceId
        : plan.name.toLowerCase() === "free",
    priceId: plan.name.toLowerCase() === "free" ? "free_plan" : undefined,
  }));

  const plansToShow = pricingPlans.length > 0 ? pricingPlans : fallbackPlans;

  // Dynamic classes based on configuration
  const alignmentClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[config.alignment];

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="rounded-xl p-1 animate-pulse">
      <div className="bg-card rounded-lg border h-full p-6">
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <div className="h-6 w-1/3 bg-muted rounded"></div>
            <div className="h-4 w-2/3 bg-muted rounded"></div>
          </div>
          <div className="h-8 w-1/4 bg-muted rounded"></div>
          <ul className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <li key={i} className="flex items-center">
                <div className="h-4 w-4 bg-muted rounded-full mr-3"></div>
                <div className="h-4 w-3/4 bg-muted rounded"></div>
              </li>
            ))}
          </ul>
          <div className="h-10 w-full bg-muted rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section
        className={`pricing-section py-12 md:py-20 lg:py-24 relative overflow-hidden
                   ${
                     variant === "default"
                       ? "bg-background"
                       : variant === "grid-dots"
                       ? "bg-grid-dots"
                       : variant === "grid-matrix"
                       ? "bg-grid-matrix"
                       : variant === "grid-bubbles"
                       ? "bg-grid-bubbles"
                       : variant === "neon"
                       ? "bg-neon"
                       : variant === "gradient"
                       ? "bg-gradient-animated"
                       : variant === "waves"
                       ? "bg-waves"
                       : ""
                   }`}
      >
        <div className="container px-4 sm:px-6 mx-auto relative z-10">
          <div className={`flex flex-col ${alignmentClass} mb-8 md:mb-12`}>
            <div className="h-8 w-1/3 bg-muted rounded mx-auto mb-4"></div>
            <div className="h-4 w-2/3 bg-muted rounded mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`pricing-section py-12 md:py-20 lg:py-24 relative overflow-hidden
                 ${
                   variant === "default"
                     ? "bg-background"
                     : variant === "grid-dots"
                     ? "bg-grid-dots"
                     : variant === "grid-matrix"
                     ? "bg-grid-matrix"
                     : variant === "grid-bubbles"
                     ? "bg-grid-bubbles"
                     : variant === "neon"
                     ? "bg-neon"
                     : variant === "gradient"
                     ? "bg-gradient-animated"
                     : variant === "waves"
                     ? "bg-waves"
                     : ""
                 }`}
    >
      <div className="container px-4 sm:px-6 mx-auto relative z-10">
        <div
          className={`flex flex-col ${alignmentClass} mb-8 md:mb-12 lg:mb-16`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            Pricing Plans
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-[42rem] mx-auto">
            Choose the perfect plan for your needs
          </p>

          {config.showToggle && (
            <div className="flex items-center justify-center mt-6 sm:mt-8 space-x-2">
              <span
                className={cn(
                  "text-sm sm:text-base",
                  config.toggleOptions[0] === "Monthly"
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                Monthly
              </span>
              <button className="w-12 h-6 rounded-full bg-muted relative px-1 flex items-center">
                <div className="w-4 h-4 rounded-full bg-primary absolute left-5 transition-all"></div>
              </button>
              <span
                className={cn(
                  "text-sm sm:text-base",
                  config.toggleOptions[0] !== "Monthly"
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                Yearly
              </span>
              <span className="inline-block ml-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-success/20 text-success">
                Save 20%
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {plansToShow.map((plan, i) => (
            <div
              key={i}
              className={`rounded-xl p-1 ${
                plan.popular
                  ? "bg-gradient-to-b from-primary to-primary-foreground/20"
                  : ""
              }`}
            >
              <div
                className={`bg-card rounded-lg border h-full p-4 sm:p-6 relative overflow-hidden 
                          ${plan.popular ? "border-0 shadow-lg" : ""} 
                          ${
                            config.highlight === i
                              ? "ring-2 ring-primary shadow-lg"
                              : ""
                          }`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {userPlan?.priceId === plan.priceId &&
                      userPlan.status === "active"
                        ? "Current Plan"
                        : "Popular"}
                    </span>
                  </div>
                )}

                <div className="flex flex-col space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg sm:text-xl">
                      {plan.name}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-baseline">
                    <span className="text-2xl sm:text-3xl font-bold">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground text-sm ml-1">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2 sm:space-y-3 flex-grow">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center">
                        <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary mr-2 sm:mr-3 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() =>
                      plan.priceId && handleSubscribe(plan.priceId)
                    }
                    disabled={
                      submitting === plan.priceId ||
                      plan.name === "Enterprise" ||
                      !plan.priceId
                    }
                    className={cn(
                      "w-full py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base",
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-card border border-input hover:bg-accent",
                      submitting === plan.priceId
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    )}
                  >
                    {submitting === plan.priceId ? "Loading..." : plan.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
