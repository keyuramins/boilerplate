'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientSupabaseClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from "lucide-react";
import { GoogleIcon } from "@/components/common/google-icon";
import Link from 'next/link';
import { projectConfig } from '@/config/project.config';
import { useToast } from '@/hooks/use-toast';

// Utility function to create SHA-256 hash
async function createHash(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const router = useRouter();
  const supabase = createClientSupabaseClient();
  const { toast } = useToast();

  // Constants for brute force protection
  const MAX_ATTEMPTS = 3;
  const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
  const STORAGE_KEY_PREFIX = 'login_attempts_';

  // Check lockout status on component mount
  useEffect(() => {
    checkLockoutStatus();
  }, [email]);

  const getStorageKey = async (email: string) => {
    // Create a unique key for each email using hash
    const hashedEmail = await createHash(email.toLowerCase());
    return `${STORAGE_KEY_PREFIX}${hashedEmail}`;
  };

  const checkLockoutStatus = async () => {
    if (!email) return;

    try {
      const storageKey = await getStorageKey(email);
      const storedData = localStorage.getItem(storageKey);
      
      if (storedData) {
        const { attempts, timestamp, hash } = JSON.parse(storedData);
        
        // Verify data integrity
        const verifyHash = await createHash(`${email.toLowerCase()}${attempts}${timestamp}`);
        if (verifyHash !== hash) {
          localStorage.removeItem(storageKey); // Tampered data, clear it
          return;
        }

        const currentTime = Date.now();
        if (attempts >= MAX_ATTEMPTS && currentTime - timestamp < LOCKOUT_DURATION) {
          setIsLocked(true);
        } else if (attempts >= MAX_ATTEMPTS && currentTime - timestamp >= LOCKOUT_DURATION) {
          // Clear lockout after duration
          localStorage.removeItem(storageKey);
          setIsLocked(false);
        }
      }
    } catch (error) {
      console.error('Error checking lockout status:', error);
    }
  };

  const updateLoginAttempts = async (attempts: number) => {
    try {
      const storageKey = await getStorageKey(email);
      const timestamp = Date.now();
      const hash = await createHash(`${email.toLowerCase()}${attempts}${timestamp}`);
      
      localStorage.setItem(storageKey, JSON.stringify({
        attempts,
        timestamp,
        hash
      }));
    } catch (error) {
      console.error('Error updating login attempts:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) {
      toast({
        title: 'Too Many Attempts',
        description: 'It seems like you forgot your password. Please reset your password.',
        variant: 'destructive',
      });
      router.push('/forgot_password');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Clear attempts on successful login
      const storageKey = await getStorageKey(email);
      localStorage.removeItem(storageKey);

      toast({
        title: 'Success!',
        description: 'You have been logged in.',
      });

      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      // Update failed attempts
      const storageKey = await getStorageKey(email);
      const storedData = localStorage.getItem(storageKey);
      let attempts = 1;

      if (storedData) {
        const parsed = JSON.parse(storedData);
        attempts = parsed.attempts + 1;
      }

      await updateLoginAttempts(attempts);

      if (attempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        toast({
          title: 'Too Many Attempts',
          description: 'It seems like you forgot your password. Please reset your password.',
          variant: 'destructive',
        });
        router.push('/forgot-password');
      } else {
        toast({
          title: 'Error',
          description: error?.message || 'Failed to login',
          variant: 'destructive',
        });
      }
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
        description: error?.message || 'Failed to login with Google',
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading || isLocked}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-muted-foreground hover:text-primary"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading || isLocked}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading || isLocked}>
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
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
