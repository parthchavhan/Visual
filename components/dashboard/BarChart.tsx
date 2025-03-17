'use client';

import { Bar, BarChart as RechartsBarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { SalesData } from '@/lib/types';

export function BarChart({ data }: { data: SalesData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="product" />
        <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
        <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="revenue" fill="hsl(var(--chart-1))" name="Revenue ($)" />
        <Bar yAxisId="right" dataKey="units" fill="hsl(var(--chart-2))" name="Units Sold" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}