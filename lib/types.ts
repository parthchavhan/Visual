export interface DataRow {
  [key: string]: string | number;
}

export interface TableData {
  columns: string[];
  rows: DataRow[];
}

export interface ChartConfig {
  type: 'bar' | 'pie' | 'line';
  xAxis: string;
  yAxis: string;
  title: string;
}
export interface SalesData {
  product: string;
  revenue: number;
  units: number;
  timestamp: string;
}