import { SalesData } from './types';

interface DataPoint {
  name: string;
  value: number;
  category: string;
}

export function generateRandomData(): DataPoint[] {
  const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Sports'];
  return categories.map((category) => ({
    name: category,
    value: Math.floor(Math.random() * 1000),
    category,
  }));
}

export function generateSalesData(): SalesData[] {
  const products = ['Laptop', 'Phone', 'Tablet', 'Watch', 'Headphones'];
  return products.map((product) => ({
    product,
    revenue: Math.floor(Math.random() * 10000),
    units: Math.floor(Math.random() * 100),
    timestamp: new Date().toISOString(),
  }));
}