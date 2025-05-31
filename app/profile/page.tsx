/**
 * @file app/profile/page.tsx
 * @description Server-side rendering for the profile page, fetches user data and passes to client component.
 * @author [Your Name]
 * @date 2024-07-31
 */
import { createSupabaseServerClient } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
import Profile from "@/components/profile/Profile";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return <Profile initialUser={user} />;
} 