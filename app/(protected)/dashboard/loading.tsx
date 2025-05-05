import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <>
      <DashboardHeader
        heading="Dashboard"
        text="Welcome back to your dashboard."
      />
      
      <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-2/3 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-3 mt-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-4 w-1/3 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <Skeleton className="h-[250px] w-full" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
