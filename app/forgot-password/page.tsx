import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { createSupabaseServerClient } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";
const siteName = process.env.NEXT_PUBLIC_SITENAME;

export const metadata: Metadata = {
  title: siteName ? `Forgot Password | ${siteName}` : "Forgot Password",
  description: "Reset your password.",
  robots: "noindex, nofollow",
  alternates: {
    canonical: `${siteUrl}/forgot-password`,
  },
  openGraph: {
    title: siteName ? `Forgot Password | ${siteName}` : "Forgot Password",
    description: "Reset your password.",
    url: `${siteUrl}/forgot-password`,
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
    title: siteName ? `Forgot Password | ${siteName}` : "Forgot Password",
    description: "Reset your password.",
    images: [`${siteUrl}/og-image.png`],
    site: siteName || "Boilerplate",
  },
};

export default async function ForgotPasswordPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect('/dashboard');
  return <ForgotPasswordForm />;
}