'use client';

import { useState } from 'react';
import { DataGrid } from '@/components/data/DataGrid';
import { ImportData } from '@/components/data/ImportData';
import { ChartConfigPanel } from '@/components/visualization/ChartConfig';
import { BarChart } from '@/components/dashboard/BarChart';
import { PieChart } from '@/components/dashboard/PieChart';
import { LineChart } from '@/components/dashboard/LineChart';
import { TableData, ChartConfig } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const [data, setData] = useState<TableData>({
    columns: ['Category', 'Value'],
    rows: [
      { Category: 'A', Value: 10 },
      { Category: 'B', Value: 20 },
      { Category: 'C', Value: 15 },
    ],
  });

  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    type: 'bar',
    xAxis: 'Category',
    yAxis: 'Value',
    title: 'Data Visualization',
  });

  const renderChart = () => {
    const chartData = data.rows.map((row) => ({
      name: row[chartConfig.xAxis]?.toString() || '',
      value: Number(row[chartConfig.yAxis]) || 0,
    }));

    switch (chartConfig.type) {
      case 'bar':
        return (
          <BarChart
            data={chartData.map((item) => ({
              product: item.name,
              revenue: item.value,
              units: 0,
              timestamp: new Date().toISOString(),
            }))}
          />
        );
      case 'pie':
        return <PieChart data={chartData} />;
      case 'line':
        return (
          <LineChart
            data={chartData.map((item) => ({
              product: item.name,
              revenue: item.value,
              units: 0,
              timestamp: new Date().toISOString(),
            }))}
          />
        );
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Data Visualization Studio By Parth</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Data Input</span>
                <ImportData onDataImport={setData} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataGrid data={data} onDataChange={setData} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Chart Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartConfigPanel
                config={chartConfig}
                data={data}
                onConfigChange={setChartConfig}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>{chartConfig.title}</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">{renderChart()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}