import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import { createSupabaseServerClient } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";
const siteName = process.env.NEXT_PUBLIC_SITENAME;

export const metadata: Metadata = {
  title: siteName ? `Login | ${siteName}` : "Login",
  description: "Login to your account.",
  robots: "noindex, follow",
  alternates: {
    canonical: `${siteUrl}/login`,
  },
  openGraph: {
    title: siteName ? `Login | ${siteName}` : "Login",
    description: "Login to your account.",
    url: `${siteUrl}/login`,
    siteName,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteName || "Boilerplate",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName ? `Login | ${siteName}` : "Login",
    description: "Login to your account.",
    images: [`${siteUrl}/og-image.png`],
    site: siteName || "Boilerplate",
  },
};

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect('/dashboard');
  return <LoginForm />;
} 