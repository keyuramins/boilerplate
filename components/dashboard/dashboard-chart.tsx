'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
//import { getApi } from '@/lib/fetch';
import { useToast } from '@/hooks/use-toast';

interface ChartDataPoint {
  name: string;
  value: number;
}

interface ChartData {
  date: string;
  users: number;
  revenue: number;
}

const sampleData: ChartData[] = [
  { date: '2024-01', users: 4000, revenue: 2400 },
  { date: '2024-02', users: 3000, revenue: 1398 },
  { date: '2024-03', users: 2000, revenue: 9800 },
  { date: '2024-04', users: 2780, revenue: 3908 },
  { date: '2024-05', users: 1890, revenue: 4800 },
  { date: '2024-06', users: 2390, revenue: 3800 },
  { date: '2024-07', users: 3490, revenue: 4300 },
];

export function DashboardChart() {
  const [period, setPeriod] = useState('week');
  const [chartData, setChartData] = useState<ChartData[]>(sampleData);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="h-[350px] w-full animate-pulse rounded-lg bg-muted" />
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Analytics Overview</h3>
          <Tabs defaultValue="week" value={period} onValueChange={setPeriod}>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="users"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
