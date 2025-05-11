import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { AccountSettings } from '@/components/dashboard/account-settings';
import { NotificationsSettings } from '@/components/dashboard/notifications-settings';
import { ApiSettings } from '@/components/dashboard/api-settings';
import { getUserDetails } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata = {
  title: 'Settings',
  description: 'Manage your account settings',
};

export default async function SettingsPage() {
  const user = await getUserDetails();
  
  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <DashboardHeader
        heading="Settings"
        text="Manage your account settings and preferences."
      />
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <AccountSettings user={user} />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationsSettings user={user} />
        </TabsContent>
        
        <TabsContent value="api">
          <ApiSettings user={user} />
        </TabsContent>
      </Tabs>
    </>
  );
}
