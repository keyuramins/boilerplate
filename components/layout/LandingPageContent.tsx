'use client';

import React, { useEffect } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Assuming ui components are now in components/ui
import Link from "next/link";
import { User } from '@supabase/supabase-js';
//import PricingSection from "@/components/PricingSection";
import { ProductWithPrices } from "@/components/PricingSection"; // Import the type
import SubscribeButton from "@/components/SubscribeButton";

// TODO: Define a proper type for products
interface LandingPageContentProps {
  user: User | null;
  products: ProductWithPrices[];
}

const LandingPageContent: React.FC<LandingPageContentProps> = ({
  user, products
}) => {
  const isPremium = !!user?.user_metadata?.subscription;
  const isLoggedIn = !!user;

  useEffect(() => {
    const redirectToDashboard: any = localStorage.getItem('redirect_to_dashboard')
    if(redirectToDashboard && redirectToDashboard == 1){
      localStorage.removeItem("redirect_to_dashboard")
      window.location.href = `${window.location.origin}/dashboard`
    }
  },[])

  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 max-w-6xl mx-auto w-full gap-12">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Pass Your Citizenship Test with Confidence</h1>
          <p className="text-lg text-muted-foreground max-w-xl">Practice with our comprehensive test platform. Get instant feedback, track your progress, and prepare effectively for your citizenship exam.</p>
          <div className="flex gap-4 mt-2">
            <Button size="lg">
              <Link href="/register">Start Practicing Now</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href="/subscription">View Plans</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <Image src="/aucitizentestimage.svg" alt="Citizenship Test" width={350} height={250} className="rounded-lg bg-card" />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card py-16 px-8">
        <h2 className="text-2xl font-bold text-center mb-10">Features Designed for Success</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="border border-border rounded-lg p-6 flex flex-col items-center text-center">
            <span className="mb-2 text-3xl">📝</span>
            <h3 className="font-semibold mb-1">20 Practice Tests</h3>
            <p className="text-muted-foreground text-sm">Access 20 distinct practice tests with randomized questions</p>
          </div>
          <div className="border border-border rounded-lg p-6 flex flex-col items-center text-center">
            <span className="mb-2 text-3xl">⏰</span>
            <h3 className="font-semibold mb-1">Timed Sessions</h3>
            <p className="text-muted-foreground text-sm">Practice with realistic 45-minute countdown timers</p>
          </div>
          <div className="border border-border rounded-lg p-6 flex flex-col items-center text-center">
            <span className="mb-2 text-3xl">⚡</span>
            <h3 className="font-semibold mb-1">Instant Feedback</h3>
            <p className="text-muted-foreground text-sm">Get immediate results and see where you need to improve</p>
          </div>
          <div className="border border-border rounded-lg p-6 flex flex-col items-center text-center">
            <span className="mb-2 text-3xl">📈</span>
            <h3 className="font-semibold mb-1">Progress Tracking</h3>
            <p className="text-muted-foreground text-sm">Monitor your performance and track improvement over time</p>
          </div>
        </div>
      </section>




      {/* Success Stories */}
      <section className="py-16 px-8">
        <h2 className="text-2xl font-bold text-center mb-10">Success Stories</h2>
        <p className="text-center text-muted-foreground mb-8">See how we helped others achieve their citizenship goals</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="font-semibold mb-1">Sarah Johnson</div>
            <div className="text-xs text-muted-foreground mb-2">New Citizen</div>
            <div className="text-sm text-muted-foreground">This website helped me pass my test on the first try. The practice questions were almost identical to the real test!</div>
          </div>
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="font-semibold mb-1">Michael Chen</div>
            <div className="text-xs text-muted-foreground mb-2">New Citizen</div>
            <div className="text-sm text-muted-foreground">The timed tests really helped me manage my anxiety. I felt so prepared when I took the actual citizenship test.</div>
          </div>
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="font-semibold mb-1">Priya Patel</div>
            <div className="text-xs text-muted-foreground mb-2">New Citizen</div>
            <div className="text-sm text-muted-foreground">I love how the app tracks progress. It helped me focus on areas where I needed more practice.</div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-card py-16 px-8" id="pricing">
        <h2 className="text-2xl font-bold text-center mb-10">Simple, Transparent Pricing</h2>
        <p className="text-center text-muted-foreground mb-8">Choose the plan that works for you</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Card */}
          <div className="border rounded-lg p-6 bg-card flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Free</h2>
              <p className="mb-4 text-muted-foreground">Access the first 5 questions of 5 practice tests. No credit card required.</p>
              <div className="text-lg font-bold mb-4">$0 / forever</div>
            </div>
            {isPremium ? (
              <Button className="w-full mt-auto" disabled>
                Current Plan
              </Button>
            ) : isLoggedIn ? (
              <>
                <Button className="w-full mt-auto" disabled>
                  Free Plan Active
                </Button>
                <div className="text-xs text-muted-foreground text-center mt-2">Your free plan is active.</div>
              </>
            ) : (
              <Button asChild className="w-full mt-auto">
                <a href="/register">Sign Up</a>
              </Button>
            )}
          </div>
          {/* Premium Card(s) */}
          {products.map((product: any) => (
            <div key={product.id} className="border rounded-lg p-6 bg-card flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="mb-4 text-muted-foreground">{product.description}</p>
                {product.prices.map((price: any) => (
                  <div key={price.id} className="mb-2">
                    <div className="text-lg font-bold">
                      {price.unit_amount && (price.unit_amount / 100).toLocaleString(undefined, { style: 'currency', currency: price.currency.toUpperCase() })}
                      {price.recurring ? ` / ${price.recurring.interval}` : ""}
                    </div>
                  </div>
                ))}
              </div>
              <SubscribeButton
                priceId={product.prices[0].id}
                label={isPremium ? "You're Premium" : "Subscribe"}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Become a Citizen?</h2>
        <p className="text-muted-foreground mb-6">Start practicing today and pass your citizenship test with confidence</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button size="lg">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPageContent; 