import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getUserDetails } from '@/lib/supabase/server';
import { projectConfig } from '@/config/project.config';
import { redirect } from 'next/navigation';
import { DashboardMetrics } from '@/components/dashboard/dashboard-metrics';
import { DashboardChart } from '@/components/dashboard/dashboard-chart';

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard overview of your account',
};

export default async function DashboardPage() {
  const user = await getUserDetails();
  
  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <DashboardHeader
        heading="Dashboard"
        text="Welcome back to your dashboard."
      />
      
      <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Welcome back, {user.user_metadata?.username || 'User'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is your dashboard. You can customize this page to show the information most relevant to you.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Your Plan</CardTitle>
            <CardDescription>
              Your current subscription status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="font-medium">Free Plan</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                Active
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Usage</CardTitle>
            <CardDescription>
              Your current usage metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Storage</span>
                <span className="text-sm font-medium">0.2 / 5 GB</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-full bg-primary rounded-full w-[4%]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-3 mt-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>
              View your activity over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Metrics</CardTitle>
            <CardDescription>
              Key metrics overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardMetrics />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
