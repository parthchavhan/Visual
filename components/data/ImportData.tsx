'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableData } from '@/lib/types';
import { Upload, Database } from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImportDataProps {
  onDataImport: (data: TableData) => void;
}

export function ImportData({ onDataImport }: ImportDataProps) {
  const [isLoading, setIsLoading] = useState(false);

  const processData = (headers: string[], rows: any[]): TableData => {
    return {
      columns: headers,
      rows: rows.map(row => {
        const processedRow: { [key: string]: string | number } = {};
        headers.forEach(header => {
          const value = row[header];
          processedRow[header] = isNaN(Number(value)) ? value : Number(value);
        });
        return processedRow;
      })
    };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      if (file.name.endsWith('.csv')) {
        // Handle CSV
        const text = await file.text();
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            const headers = results.meta.fields || [];
            onDataImport(processData(headers, results.data));
          }
        });
      } else if (file.name.match(/\.xlsx?$/)) {
        // Handle Excel
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        if (jsonData.length > 0) {
          const headers = Object.keys(jsonData[0]);
          onDataImport(processData(headers, jsonData));
        }
      }
    } catch (error) {
      console.error('Error importing file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <div className="relative">
        <Input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={isLoading}
        />
        <Button variant="outline" disabled={isLoading}>
          <Upload className="h-4 w-4 mr-2" />
          Import File
        </Button>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Database className="h-4 w-4 mr-2" />
            Connect Database
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect to Database</DialogTitle>
            <DialogDescription>
              Enter your database connection details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label>Connection String</label>
              <Input type="text" placeholder="Enter your database connection string" />
            </div>
            <div className="grid gap-2">
              <label>SQL Query</label>
              <Input type="text" placeholder="SELECT * FROM your_table" />
            </div>
            <Button onClick={() => {}} disabled>
              Connect
              <span className="ml-2 text-xs text-muted-foreground">(Coming Soon)</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}