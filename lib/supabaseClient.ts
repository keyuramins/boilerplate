'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// TODO: Replace with your own Supabase URL environment variable key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// TODO: Replace with your own Supabase Anon Key environment variable key
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Usage:
// - On the server: pass allowSetCookies: true ONLY in Route Handlers or Server Actions
// - In middleware or server components: use default (false)

/**
 * Creates a Supabase server client instance.
 *
 * @param {object} [options] - Options for the client.
 * @param {boolean} [options.allowSetCookies=false] - Whether to allow setting cookies. Set to true in Route Handlers or Server Actions.
 * @returns {Promise<ReturnType<typeof createServerClient>>} A promise that resolves to the Supabase server client.
 */
export async function createSupabaseServerClient({ allowSetCookies = false } = {}) {
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: async () => (await cookieStore).getAll(),
      setAll: allowSetCookies
        ? async (cookiesToSet) => {
            for (const cookie of cookiesToSet) {
              (await cookieStore).set(cookie.name, cookie.value, cookie.options);
            }
          }
        : async () => {}, // no-op if not allowed
    },
  });
} 