import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { JobRequest, Column } from '../types';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

interface DataGridProps {
  data: JobRequest[];
  columns: Column[];
  onCellClick: (rowId: string, columnId: string, value: any) => void;
  onRowSelect: (rowId: string) => void;
}

const DataGrid: React.FC<DataGridProps> = ({ data, columns, onCellClick, onRowSelect }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof JobRequest | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleSort = (key: keyof JobRequest) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

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

  const renderCell = (row: JobRequest, column: Column) => {
    const value = row[column.accessor];
    
    switch (column.accessor) {
      case 'status':
        return <StatusBadge status={value as any} />;
      case 'priority':
        return <PriorityBadge priority={value as any} />;
      case 'url':
        return (
          <a 
            href={value as string} 
            className="text-blue-600 hover:text-blue-800 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value as string}
          </a>
        );
      case 'estValue':
        return <span className="font-medium">{(value as number).toLocaleString()}</span>;
      default:
        return <span>{value as string}</span>;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="w-8 px-3 py-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(new Set(data.map(row => row.id)));
                    } else {
                      setSelectedRows(new Set());
                    }
                  }}
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                    column.width || 'w-auto'
                  }`}
                  onClick={() => column.sortable && handleSort(column.accessor)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp 
                          className={`w-3 h-3 ${
                            sortConfig.key === column.accessor && sortConfig.direction === 'asc' 
                              ? 'text-gray-900' 
                              : 'text-gray-400'
                          }`} 
                        />
                        <ChevronDown 
                          className={`w-3 h-3 -mt-1 ${
                            sortConfig.key === column.accessor && sortConfig.direction === 'desc' 
                              ? 'text-gray-900' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row, index) => (
              <tr 
                key={row.id}
                className={`hover:bg-gray-50 ${selectedRows.has(row.id) ? 'bg-blue-50' : ''}`}
              >
                <td className="w-8 px-3 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedRows.has(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                  />
                </td>
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer hover:bg-gray-50"
                    onClick={() => onCellClick(row.id, column.id, row[column.accessor])}
                  >
                    {renderCell(row, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataGrid;