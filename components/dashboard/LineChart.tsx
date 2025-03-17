'use client';

import { CartesianGrid, Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { SalesData } from '@/lib/types';

export function LineChart({ data }: { data: SalesData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="product" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}