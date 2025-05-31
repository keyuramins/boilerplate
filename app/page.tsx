import type { Metadata } from "next";
// import Image from "next/image";
// import { Button } from "../components/ui/button";
// import { getStripeProductsWithPrices } from "../lib/stripeClient";
// import SubscribeButton from "../components/SubscribeButton";
// import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabaseClient";
import LandingPageContent from "@/components/layout/LandingPageContent";
import { getSubscriptionProductsWithPrices } from "@/lib/stripeActions";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";
const siteName = process.env.NEXT_PUBLIC_SITENAME;

export const metadata: Metadata = {
  title: siteName ? `${siteName} | Boilerplate` : "Next.js Boilerplate",
  description: "A generic Next.js boilerplate with Supabase authentication and Stripe billing examples.",
  // TODO: Add more generic metadata here
  keywords: ["Next.js", "Boilerplate", "Supabase Auth", "Stripe Billing", "SaaS"],
  robots: "index, follow",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteName ? `${siteName} | Boilerplate` : "Next.js Boilerplate",
    description: "A generic Next.js boilerplate with Supabase authentication and Stripe billing examples.",
    url: siteUrl,
    siteName,
    // TODO: Replace with a generic og image or remove
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteName || "Next.js Boilerplate",
      },
    ],
    // locale: "en_AU", // Remove specific locale
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName ? `${siteName} | Boilerplate` : "Next.js Boilerplate",
    description: "A generic Next.js boilerplate with Supabase authentication and Stripe billing examples.",
    // TODO: Replace with a generic twitter image or remove
    images: [`${siteUrl}/og-image.png`],
    site: siteName || "Next.js Boilerplate",
  },
};

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const products = await getSubscriptionProductsWithPrices();

  return (
    <>
      <LandingPageContent user={user} products={products} />
    </>
  );
}
