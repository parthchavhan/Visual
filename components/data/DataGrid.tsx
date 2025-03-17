'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { DataRow, TableData } from '@/lib/types';

interface DataGridProps {
  data: TableData;
  onDataChange: (data: TableData) => void;
}

export function DataGrid({ data, onDataChange }: DataGridProps) {
  const [newColumnName, setNewColumnName] = useState('');

  const addColumn = () => {
    if (!newColumnName.trim()) return;
    
    const newColumns = [...data.columns, newColumnName];
    const newRows = data.rows.map(row => ({
      ...row,
      [newColumnName]: ''
    }));
    
    onDataChange({ columns: newColumns, rows: newRows });
    setNewColumnName('');
  };

  const addRow = () => {
    const newRow: DataRow = {};
    data.columns.forEach(col => {
      newRow[col] = '';
    });
    
    onDataChange({
      ...data,
      rows: [...data.rows, newRow]
    });
  };

  const updateCell = (rowIndex: number, column: string, value: string) => {
    const newRows = [...data.rows];
    newRows[rowIndex] = {
      ...newRows[rowIndex],
      [column]: isNaN(Number(value)) ? value : Number(value)
    };
    
    onDataChange({
      ...data,
      rows: newRows
    });
  };

  const deleteRow = (rowIndex: number) => {
    const newRows = data.rows.filter((_, index) => index !== rowIndex);
    onDataChange({
      ...data,
      rows: newRows
    });
  };

  const deleteColumn = (columnName: string) => {
    const newColumns = data.columns.filter(col => col !== columnName);
    const newRows = data.rows.map(row => {
      const newRow = { ...row };
      delete newRow[columnName];
      return newRow;
    });
    
    onDataChange({
      columns: newColumns,
      rows: newRows
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="New column name"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={addColumn} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Column
        </Button>
        <Button onClick={addRow} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Row
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {data.columns.map((column) => (
                <TableHead key={column} className="relative group">
                  <span className="mr-8">{column}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deleteColumn(column)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableHead>
              ))}
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {data.columns.map((column) => (
                  <TableCell key={column}>
                    <Input
                      value={row[column]?.toString() || ''}
                      onChange={(e) => updateCell(rowIndex, column, e.target.value)}
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteRow(rowIndex)}
                    className="h-8 w-8 text-destructive hover:text-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}