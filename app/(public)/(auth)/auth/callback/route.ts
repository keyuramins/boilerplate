import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  let next = requestUrl.searchParams.get('next');

  // Forward the code for reset-password flow
  if(next?.includes("reset-password")){
      next = '/reset-password?code=' + code
  }
  

  if (code) {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code);
  }
  // URL to redirect to after sign in process completes // Pass the code as well
  return NextResponse.redirect(new URL(`${next || '/dashboard'}`, request.url));
}
