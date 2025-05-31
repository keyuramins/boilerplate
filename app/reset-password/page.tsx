import type { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { createSupabaseServerClient } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";
const siteName = process.env.NEXT_PUBLIC_SITENAME;

export const metadata: Metadata = {
  title: siteName ? `Reset Password | ${siteName}` : "Reset Password",
  description: "Set a new password for your account.",
  robots: "noindex, nofollow",
  alternates: {
    canonical: `${siteUrl}/reset-password`,
  },
  openGraph: {
    title: siteName ? `Reset Password | ${siteName}` : "Reset Password",
    description: "Set a new password for your account.",
    url: `${siteUrl}/reset-password`,
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
    title: siteName ? `Reset Password | ${siteName}` : "Reset Password",
    description: "Set a new password for your account.",
    images: [`${siteUrl}/og-image.png`],
    site: siteName || "Boilerplate",
  },
};

export default async function ResetPasswordPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect('/dashboard');
  return <ResetPasswordForm />;
}