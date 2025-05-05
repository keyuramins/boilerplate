import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { type CookieOptions } from '@supabase/ssr';
import { Database } from '@/types/supabase';

export function createServerSupabaseClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function getUserDetails() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: userDetails } = await supabase.auth.getUser();
    return userDetails.user;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}