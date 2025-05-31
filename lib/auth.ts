import { createSupabaseServerClient } from './supabaseClient';
import { NextRequest } from 'next/server';

/**
 * Checks if the current request is authenticated.
 * @param req The NextRequest object.
 * @returns A promise that resolves to true if the user is authenticated, false otherwise.
 */
export async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const supabase = await createSupabaseServerClient({ allowSetCookies: false });
  const { data: { user } } = await supabase.auth.getUser();
  return !!user;
} 