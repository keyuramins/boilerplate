import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import { createSupabaseServerClient } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";
const siteName = process.env.NEXT_PUBLIC_SITENAME;

export const metadata: Metadata = {
  title: siteName ? `Register | ${siteName}` : "Register",
  description: "Create your account.",
  robots: "noindex, follow",
  alternates: {
    canonical: `${siteUrl}/register`,
  },
  openGraph: {
    title: siteName ? `Register | ${siteName}` : "Register",
    description: "Create your account.",
    url: `${siteUrl}/register`,
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
    title: siteName ? `Register | ${siteName}` : "Register",
    description: "Create your account.",
    images: [`${siteUrl}/og-image.png`],
    site: siteName || "Boilerplate",
  },
};

export default async function RegisterPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect('/dashboard');
  return <RegisterForm />;
} 