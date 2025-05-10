'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientSupabaseClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

interface ResetPasswordFormProps {
  next?: string;
}

export function ResetPasswordForm({ next = '/dashboard' }: ResetPasswordFormProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientSupabaseClient();
  const { toast } = useToast();

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        // Get the user's email from the session
        if (session?.user.email) {
          setEmail(session.user.email);
        }
      }
    });

    // Check if we're in a password recovery flow
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user.email) {
        setEmail(session.user.email);
      }
    };

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const validatePassword = () => {
    try {
      passwordSchema.parse({ password, confirmPassword });
      setValidationError(null);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setValidationError(err.errors[0].message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword()) return;
    setIsLoading(true);

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({ 
        password: password 
      });

      if (error) throw error;

      toast({
        title: 'Password updated successfully',
        description: 'Your password has been reset. Please log in with your new password.',
      });

      // Sign out and redirect to login
      await supabase.auth.signOut();
      router.push(`/login?reset=success&next=${encodeURIComponent(next)}`);
      router.refresh();
    } catch (err: any) {
      toast({
        title: 'Error resetting password',
        description: err.message || 'Failed to reset password. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Reset Password</h2>
        {email && (
          <p className="text-sm text-muted-foreground">
            Reset password for {email}
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setValidationError(null);
            }}
            required
            disabled={isLoading}
            className={validationError ? 'border-red-500' : ''}
            autoComplete="new-password"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setValidationError(null);
            }}
            required
            disabled={isLoading}
            className={validationError ? 'border-red-500' : ''}
            autoComplete="new-password"
          />
        </div>

        {validationError && (
          <p className="text-sm text-red-500 mt-2">{validationError}</p>
        )}

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Password must:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Be at least 8 characters long</li>
            <li>Contain at least one uppercase letter</li>
            <li>Contain at least one lowercase letter</li>
            <li>Contain at least one number</li>
            <li>Contain at least one special character</li>
          </ul>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Reset Password
        </Button>
      </form>
    </div>
  );
}
