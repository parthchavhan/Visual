'use client';

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { SalesData } from "@/lib/types";

export function DataTable({ 
  data, 
  onUpdate,
  onDelete 
}: { 
  data: SalesData[];
  onUpdate: (updatedItem: SalesData) => void;
  onDelete: (product: string) => void;
}) {
  const [editingCell, setEditingCell] = useState<{
    product: string;
    field: 'product' | 'revenue' | 'units';
  } | null>(null);

  const [editValue, setEditValue] = useState<string>('');

  const handleEdit = (item: SalesData, field: 'product' | 'revenue' | 'units') => {
    setEditingCell({ product: item.product, field });
    setEditValue(item[field].toString());
  };

  const handleSave = (item: SalesData) => {
    if (!editingCell) return;

    if (editingCell.field === 'product') {
      if (editValue.trim() === '') {
        setEditingCell(null);
        setEditValue('');
        return;
      }
      
      const updatedItem = {
        ...item,
        product: editValue,
      };
      onUpdate(updatedItem);
    } else {
      const value = Number(editValue);
      if (isNaN(value) || value < 0) {
        setEditingCell(null);
        setEditValue('');
        return;
      }

      const updatedItem = {
        ...item,
        [editingCell.field]: value,
      };
      onUpdate(updatedItem);
    }

    setEditingCell(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent, item: SalesData) => {
    if (e.key === 'Enter') {
      handleSave(item);
    } else if (e.key === 'Escape') {
      setEditingCell(null);
      setEditValue('');
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">Units</TableHead>
            <TableHead className="text-right">Timestamp</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.product}>
              <TableCell className="font-medium">
                {editingCell?.product === item.product && editingCell.field === 'product' ? (
                  <Input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleSave(item)}
                    onKeyDown={(e) => handleKeyDown(e, item)}
                    className="w-full"
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() => handleEdit(item, 'product')}
                    className="cursor-pointer hover:bg-muted px-2 py-1 rounded"
                  >
                    {item.product}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">
                {editingCell?.product === item.product && editingCell.field === 'revenue' ? (
                  <Input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleSave(item)}
                    onKeyDown={(e) => handleKeyDown(e, item)}
                    className="w-24 ml-auto"
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() => handleEdit(item, 'revenue')}
                    className="cursor-pointer hover:bg-muted px-2 py-1 rounded"
                  >
                    ${item.revenue.toLocaleString()}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">
                {editingCell?.product === item.product && editingCell.field === 'units' ? (
                  <Input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleSave(item)}
                    onKeyDown={(e) => handleKeyDown(e, item)}
                    className="w-24 ml-auto"
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() => handleEdit(item, 'units')}
                    className="cursor-pointer hover:bg-muted px-2 py-1 rounded"
                  >
                    {item.units.toLocaleString()}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">
                {new Date(item.timestamp).toLocaleTimeString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(item.product)}
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
  );
}