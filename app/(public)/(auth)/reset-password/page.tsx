import { Metadata } from 'next';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Create a new password for your account.',
};

interface PageProps {
  searchParams: {
    code?: string;
    next?: string;
  };
}

export default async function ResetPasswordPage({
  searchParams,
}: PageProps) {
  // Get the token from the URL query parameters
  const params = await searchParams;
  const token = params?.code;
  const next = params?.next || '/dashboard';
  
  if (!token) {
    redirect('/forgot-password?error=missing-token');
  }

  // The token will be automatically handled by Supabase client
  // when the user clicks the reset link in their email
  // The PKCE flow will be handled by the auth callback route
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="relative z-10 mx-auto w-full max-w-[350px] space-y-6">
        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <ResetPasswordForm next={next} />
        </div>
      </div>
    </main>
  );
}
