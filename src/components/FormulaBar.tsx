import React, { useState, useEffect } from 'react';

interface FormulaBarProps {
  selectedCell: string;
  cellValue: any;
  onValueChange: (value: string) => void;
}

const FormulaBar: React.FC<FormulaBarProps> = ({ selectedCell, cellValue, onValueChange }) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(String(cellValue || ''));
  }, [cellValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onValueChange(value);
  };

  return (
    <div className="flex items-center bg-white border-b border-gray-300 px-4 py-2">
      <div className="flex items-center space-x-4">
        <div className="text-sm font-medium text-gray-700 min-w-16">
          {selectedCell || 'A1'}
        </div>
        <div className="text-gray-400">fx</div>
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter value or formula"
          />
        </form>
      </div>
    </div>
  );
};

export default FormulaBar;