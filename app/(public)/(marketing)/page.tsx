"use server"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { projectConfig } from "@/config/project.config";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {Plans} from "@/components/public/billing";
import { getProducts } from "@/lib/stripe/client";

export default async function Home() {
  const products = await getProducts();			
  return (
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background via-background to-secondary/20">
          <div className="container px-4 md:px-6 w-full">
            <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                  {projectConfig.appTitle}
                </h1>
                <p className="text-muted-foreground md:text-xl max-w-[42rem] mx-auto">
                  A production-ready Next.js boilerplate with Supabase Auth and
                  ShadCN UI. Build your SaaS app today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group">
                  <Link href="/dashboard">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl font-bold tracking-tight">
                Key Features
              </h2>
              <p className="text-muted-foreground mt-4 max-w-[42rem] mx-auto">
                Everything you need to build your next SaaS application
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Authentication",
                  description:
                    "Complete authentication system with email/password and Google OAuth",
                },
                {
                  title: "Protected Routes",
                  description:
                    "Middleware-based route protection to secure your application",
                },
                {
                  title: "Dark Mode",
                  description:
                    "Built-in dark mode support with system preference detection",
                },
                {
                  title: "Responsive Design",
                  description: "Fully responsive layouts for all device sizes",
                },
                {
                  title: "ShadCN UI",
                  description:
                    "Beautiful, accessible UI components built with Radix UI and Tailwind",
                },
                {
                  title: "TypeScript",
                  description:
                    "Full TypeScript support for better development experience",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-card rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex flex-col space-y-2">
                    <h3 className="font-bold text-xl">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

	<Plans products={products}/>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary to-background text-primary">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-[42rem] mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className=" mb-8">
                Start building your application today with our production-ready
                boilerplate.
              </p>
              <Button asChild size="lg" className="group">
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
  );
}
