'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function DashboardChart() {
  const [period, setPeriod] = useState('week');

  // Sample data for the chart - this would come from your API in a real app
  const weekData = [
    { name: 'Mon', tasks: 4, projects: 2 },
    { name: 'Tue', tasks: 6, projects: 2 },
    { name: 'Wed', tasks: 5, projects: 3 },
    { name: 'Thu', tasks: 8, projects: 3 },
    { name: 'Fri', tasks: 12, projects: 4 },
    { name: 'Sat', tasks: 10, projects: 4 },
    { name: 'Sun', tasks: 7, projects: 5 },
  ];

  const monthData = [
    { name: 'Week 1', tasks: 20, projects: 2 },
    { name: 'Week 2', tasks: 35, projects: 3 },
    { name: 'Week 3', tasks: 28, projects: 4 },
    { name: 'Week 4', tasks: 42, projects: 5 },
  ];

  const yearData = [
    { name: 'Jan', tasks: 40, projects: 2 },
    { name: 'Feb', tasks: 35, projects: 2 },
    { name: 'Mar', tasks: 48, projects: 3 },
    { name: 'Apr', tasks: 52, projects: 3 },
    { name: 'May', tasks: 58, projects: 4 },
    { name: 'Jun', tasks: 62, projects: 4 },
    { name: 'Jul', tasks: 70, projects: 5 },
    { name: 'Aug', tasks: 75, projects: 5 },
    { name: 'Sep', tasks: 80, projects: 5 },
    { name: 'Oct', tasks: 70, projects: 4 },
    { name: 'Nov', tasks: 65, projects: 4 },
    { name: 'Dec', tasks: 60, projects: 4 },
  ];

  const data = {
    'week': weekData,
    'month': monthData,
    'year': yearData,
  }[period];

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <Tabs defaultValue="week" value={period} onValueChange={setPeriod}>
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '0.5rem',
                color: 'hsl(var(--foreground))',
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="tasks"
              stackId="1"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1) / 0.2)"
              name="Tasks"
            />
            <Area
              type="monotone"
              dataKey="projects"
              stackId="2"
              stroke="hsl(var(--chart-2))"
              fill="hsl(var(--chart-2) / 0.2)"
              name="Projects"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}