import React, { useState, useRef, useEffect, useCallback } from 'react';
import { JobRequest, Column } from '../types';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

interface SpreadsheetGridProps {
  data: JobRequest[];
  columns: Column[];
  onCellChange: (rowId: string, columnId: string, value: any) => void;
  onRowSelect: (rowId: string) => void;
}

interface CellPosition {
  row: number;
  col: number;
}

const SpreadsheetGrid: React.FC<SpreadsheetGridProps> = ({ 
  data, 
  columns, 
  onCellChange, 
  onRowSelect 
}) => {
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [editingCell, setEditingCell] = useState<CellPosition | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingCell]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    let newRow = row;
    let newCol = col;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newRow = Math.max(0, row - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newRow = Math.min(data.length - 1, row + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newCol = Math.max(0, col - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        newCol = Math.min(columns.length - 1, col + 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (editingCell) {
          handleSaveEdit();
        } else {
          handleStartEdit(row, col);
        }
        break;
      case 'Escape':
        e.preventDefault();
        if (editingCell) {
          setEditingCell(null);
          setEditValue('');
        }
        break;
      case 'F2':
        e.preventDefault();
        handleStartEdit(row, col);
        break;
      default:
        // Start editing if alphanumeric key is pressed
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !editingCell) {
          handleStartEdit(row, col, e.key);
        }
        break;
    }

    if (newRow !== row || newCol !== col) {
      setSelectedCell({ row: newRow, col: newCol });
    }
  }, [selectedCell, editingCell, data.length, columns.length]);

  // Add keyboard event listener
  useEffect(() => {
    if (gridRef.current) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown]);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setSelectedCell({ row: rowIndex, col: colIndex });
    if (editingCell) {
      handleSaveEdit();
    }
  };

  const handleCellDoubleClick = (rowIndex: number, colIndex: number) => {
    handleStartEdit(rowIndex, colIndex);
  };

  const handleStartEdit = (rowIndex: number, colIndex: number, initialValue?: string) => {
    const row = data[rowIndex];
    const column = columns[colIndex];
    const currentValue = row[column.accessor];
    
    // Don't edit status and priority columns (they have special components)
    if (column.accessor === 'status' || column.accessor === 'priority') {
      return;
    }

    setEditingCell({ row: rowIndex, col: colIndex });
    setEditValue(initialValue || String(currentValue || ''));
  };

  const handleSaveEdit = () => {
    if (!editingCell) return;

    const row = data[editingCell.row];
    const column = columns[editingCell.col];
    
    let processedValue: any = editValue;
    
    // Process value based on column type
    if (column.accessor === 'estValue') {
      processedValue = parseInt(editValue.replace(/[^\d]/g, '')) || 0;
    }

    onCellChange(row.id, column.id, processedValue);
    setEditingCell(null);
    setEditValue('');
  };

  const handleRowSelect = (rowId: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    setSelectedRows(newSelected);
    onRowSelect(rowId);
  };

  // Get column width based on column type
  const getColumnWidth = (column: Column) => {
    switch (column.accessor) {
      case 'jobRequest':
        return '280px';
      case 'url':
        return '180px';
      case 'submitter':
      case 'assigned':
        return '140px';
      case 'estValue':
        return '100px';
      case 'submitted':
      case 'dueDate':
        return '100px';
      case 'status':
        return '110px';
      case 'priority':
        return '90px';
      default:
        return '120px';
    }
  };

  const renderCell = (row: JobRequest, column: Column, rowIndex: number, colIndex: number) => {
    const value = row[column.accessor];
    const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
    const isEditing = editingCell?.row === rowIndex && editingCell?.col === colIndex;
    
    if (isEditing) {
      return (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSaveEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSaveEdit();
            } else if (e.key === 'Escape') {
              setEditingCell(null);
              setEditValue('');
            }
            e.stopPropagation();
          }}
          className="w-full h-full px-2 py-1 border-2 border-blue-500 outline-none bg-white text-sm"
        />
      );
    }

    let content;
    switch (column.accessor) {
      case 'status':
        content = <StatusBadge status={value as any} />;
        break;
      case 'priority':
        content = <PriorityBadge priority={value as any} />;
        break;
      case 'url':
        content = (
          <a 
            href={value as string} 
            className="text-blue-600 hover:text-blue-800 hover:underline text-sm truncate block"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title={value as string}
          >
            {value as string}
          </a>
        );
        break;
      case 'estValue':
        content = <span className="font-medium text-sm">{(value as number).toLocaleString()}</span>;
        break;
      default:
        content = (
          <span 
            className="text-sm block" 
            title={value as string}
          >
            {value as string}
          </span>
        );
    }

    return (
      <div className={`w-full h-full px-2 py-2 flex items-center ${isSelected ? 'bg-blue-100' : ''}`}>
        {content}
      </div>
    );
  };

  // Generate row numbers starting from 1
  const rowNumbers = Array.from({ length: data.length + 20 }, (_, i) => i + 1);

  return (
    <div className="bg-white">
      <div 
        ref={gridRef}
        className="overflow-auto focus:outline-none border-l border-gray-300"
        tabIndex={0}
        style={{ height: 'calc(100vh - 280px)' }}
      >
        <div className="inline-block min-w-full">
          {/* Header */}
          <div className="flex bg-gray-100 border-b border-gray-300 sticky top-0 z-10">
            {/* Row number header */}
            <div className="w-12 h-8 border-r border-gray-300 bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
              
            </div>
            
            {/* Column headers */}
            {columns.map((column, colIndex) => (
              <div
                key={column.id}
                className="h-8 border-r border-gray-300 bg-gray-100 flex items-center px-2 text-xs font-medium text-gray-700"
                style={{ width: getColumnWidth(column), minWidth: getColumnWidth(column) }}
              >
                <span className="truncate">{column.header}</span>
              </div>
            ))}
          </div>

          {/* Data rows */}
          {data.map((row, rowIndex) => (
            <div key={row.id} className="flex border-b border-gray-200 hover:bg-gray-50">
              {/* Row number */}
              <div className="w-12 h-8 border-r border-gray-300 bg-gray-50 flex items-center justify-center text-xs text-gray-600">
                {rowNumbers[rowIndex]}
              </div>
              
              {/* Data cells */}
              {columns.map((column, colIndex) => {
                const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                return (
                  <div
                    key={column.id}
                    className={`h-8 border-r border-gray-200 cursor-cell relative overflow-hidden ${
                      isSelected ? 'ring-2 ring-blue-500 ring-inset z-20' : ''
                    } ${selectedRows.has(row.id) ? 'bg-blue-50' : ''}`}
                    style={{ width: getColumnWidth(column), minWidth: getColumnWidth(column) }}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    onDoubleClick={() => handleCellDoubleClick(rowIndex, colIndex)}
                  >
                    {renderCell(row, column, rowIndex, colIndex)}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Empty rows for spreadsheet feel */}
          {Array.from({ length: 20 }, (_, i) => (
            <div key={`empty-${i}`} className="flex border-b border-gray-100">
              <div className="w-12 h-8 border-r border-gray-300 bg-gray-50 flex items-center justify-center text-xs text-gray-400">
                {data.length + i + 1}
              </div>
              {columns.map((column) => (
                <div
                  key={`empty-${i}-${column.id}`}
                  className="h-8 border-r border-gray-200 cursor-cell"
                  style={{ width: getColumnWidth(column), minWidth: getColumnWidth(column) }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetGrid;