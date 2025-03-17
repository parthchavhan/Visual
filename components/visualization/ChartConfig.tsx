'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChartConfig, TableData } from '@/lib/types';

interface ChartConfigProps {
  config: ChartConfig;
  data: TableData;
  onConfigChange: (config: ChartConfig) => void;
}

export function ChartConfigPanel({ config, data, onConfigChange }: ChartConfigProps) {
  return (
    <div className="space-y-4 p-4 border rounded-md">
      <div className="space-y-2">
        <Label>Chart Type</Label>
        <Select
          value={config.type}
          onValueChange={(value: 'bar' | 'pie' | 'line') =>
            onConfigChange({ ...config, type: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bar">Bar Chart</SelectItem>
            <SelectItem value="pie">Pie Chart</SelectItem>
            <SelectItem value="line">Line Chart</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Chart Title</Label>
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
          placeholder="Enter chart title"
        />
      </div>

      <div className="space-y-2">
        <Label>X-Axis (Categories)</Label>
        <Select
          value={config.xAxis}
          onValueChange={(value) => onConfigChange({ ...config, xAxis: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {data.columns.map((column) => (
              <SelectItem key={column} value={column}>
                {column}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Y-Axis (Values)</Label>
        <Select
          value={config.yAxis}
          onValueChange={(value) => onConfigChange({ ...config, yAxis: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {data.columns.map((column) => (
              <SelectItem key={column} value={column}>
                {column}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}