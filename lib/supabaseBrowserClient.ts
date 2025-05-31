import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase browser client instance.
 * Initialized only on the client side.
 */
export const supabaseBrowserClient =
  typeof window !== 'undefined'
    ? createBrowserClient(supabaseUrl, supabaseKey)
    : undefined; 