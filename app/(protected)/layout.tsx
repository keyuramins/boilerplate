import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { getUserDetails } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserDetails();
  
  if (!user) {
    redirect('/login');
  }

  return <DashboardShell>{children}</DashboardShell>;
}