import { Metadata } from 'next';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Create a new password for your account.',
};

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ResetPasswordPage({
  searchParams,
}: PageProps) {
  // Get the token from the URL - Supabase sends it as a hash fragment
  const token = searchParams?.token?.toString();
  
  if (!token) {
    redirect('/forgot-password?error=missing-token');
  }

  // Initialize Supabase client
  const supabase = await createServerSupabaseClient();

  try {
    // Set the recovery token in the session
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'recovery'
    });

    if (error) {
      redirect('/forgot-password?error=invalid-token');
    }
  } catch (error) {
    redirect('/forgot-password?error=invalid-token');
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="relative z-10 mx-auto w-full max-w-[350px] space-y-6">
        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <ResetPasswordForm code={token} />
        </div>
      </div>
    </main>
  );
} 