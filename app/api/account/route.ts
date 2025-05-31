import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseClient';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(req: NextRequest) {
  // 1. Get the authenticated user using ANON key
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'User not found or not authenticated' }, { status: 401 });
  }

  // 2. Use SERVICE ROLE key for admin actions
  const adminClient = createClient(supabaseUrl, serviceRoleKey);

  // Check for active subscription in user_metadata
  const meta = user.user_metadata || {};
  const hasActiveSub = !!meta.subscription;

  if (hasActiveSub) {
    // Soft delete: append scheduled_account_deletion: true
    const newMeta = { ...meta, scheduled_account_deletion: true };
    const { error: updateError } = await adminClient.auth.admin.updateUserById(user.id, { user_metadata: newMeta });
    if (updateError) {
      return NextResponse.json({ error: 'Failed to schedule account deletion', details: updateError.message }, { status: 500 });
    }
    return NextResponse.json({ status: 'scheduled', message: 'Account deletion scheduled after subscription ends.' });
  } else {
    // Hard delete
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(user.id);
    if (deleteError) {
      return NextResponse.json({ error: 'Failed to delete account', details: deleteError.message }, { status: 500 });
    }
    return NextResponse.json({ status: 'deleted', message: 'Account deleted successfully.' });
  }
} 