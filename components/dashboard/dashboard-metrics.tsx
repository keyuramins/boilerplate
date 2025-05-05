'use client';

import { 
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function DashboardMetrics() {
  // In a real application, this data would come from your API/database
  const metrics = [
    { name: 'Total Projects', value: '5', change: '+2', up: true },
    { name: 'Active Tasks', value: '12', change: '-3', up: false },
    { name: 'Completed Tasks', value: '24', change: '+8', up: true },
    { name: 'Team Members', value: '3', change: '+1', up: true },
  ];

  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-sm font-medium">{metric.name}</span>
          <div className="flex items-center gap-2">
            <span className="font-bold">{metric.value}</span>
            <Badge variant={metric.up ? 'default' : 'secondary'} className={metric.up ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 hover:text-emerald-600' : 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 hover:text-amber-600'}>
              {metric.change}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}