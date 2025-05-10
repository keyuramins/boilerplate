import { Metadata } from 'next';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password via email.',
};

interface PageProps {
  searchParams: {
    error?: string;
    success?: string;
  };
}

export default async function ForgotPasswordPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const error = params?.error;
  const success = params?.success;
  
  const getErrorAlert = () => {
    switch (error) {
      case 'expired':
        return {
          title: 'Reset Link Expired',
          description: 'Your password reset link has expired. Please request a new one.',
        };
      case 'invalid-token':
        return {
          title: 'Invalid Reset Link',
          description: 'The password reset link is invalid. Please request a new one.',
        };
      case 'missing-token':
        return {
          title: 'Missing Reset Link',
          description: 'No password reset link was provided. Please request a new one.',
        };
      case 'server-error':
        return {
          title: 'Server Error',
          description: 'An error occurred while processing your request. Please try again.',
        };
      default:
        return null;
    }
  };

  const errorAlert = getErrorAlert();
  
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="relative z-10 mx-auto w-full max-w-[350px] space-y-6">
        {errorAlert && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{errorAlert.title}</AlertTitle>
            <AlertDescription>{errorAlert.description}</AlertDescription>
          </Alert>
        )}

        {success === 'email-sent' && (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Check your email</AlertTitle>
            <AlertDescription>
              We have sent you a password reset link. It may take a few minutes to arrive.
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
