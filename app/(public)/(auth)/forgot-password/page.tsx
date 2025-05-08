import { Metadata } from 'next';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password via email.',
};

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ForgotPasswordPage({
  searchParams,
}: PageProps) {
  const error = searchParams?.error;
  
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="relative z-10 mx-auto w-full max-w-[350px] space-y-6">
        {error === 'expired' && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Reset Link Expired</AlertTitle>
            <AlertDescription>
              Your password reset link has expired. Please request a new one.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <ForgotPasswordForm />
        </div>
      </div>
    </main>
  );
} 