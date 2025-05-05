'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientSupabaseClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from "lucide-react";
import {GoogleIcon} from "@/components/common/google-icon";
import { projectConfig } from '@/config/project.config';
import { useToast } from '@/hooks/use-toast';

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientSupabaseClient();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: projectConfig.auth.emailVerification.enabled 
          ? `${window.location.origin}/auth/callback`
          : undefined,
          data: {
            full_name: fullname?.trim()
          },
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Success!',
        description: 'Your account has been created. Please check your email for verification.',
      });

      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message || 'Failed to create account',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message || 'Failed to register with Google',
        variant: 'destructive',
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            id="fullname"
            placeholder="John Doe"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up
        </Button>
      </form>

      {projectConfig.providers.google && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GoogleIcon className="mr-2 h-4 w-4" />
            )}
            Google
          </Button>
        </>
      )}
    </div>
  );
}