import React from 'react';
import { 
  Eye, 
  ArrowUpDown, 
  Filter, 
  Grid3X3, 
  Upload, 
  Download, 
  Share2, 
  Plus 
} from 'lucide-react';

interface ToolbarProps {
  onAction: (action: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAction }) => {
  const buttons = [
    { id: 'hide-fields', icon: Eye, label: 'Hide fields', variant: 'secondary' },
    { id: 'sort', icon: ArrowUpDown, label: 'Sort', variant: 'secondary' },
    { id: 'filter', icon: Filter, label: 'Filter', variant: 'secondary' },
    { id: 'cell-view', icon: Grid3X3, label: 'Cell view', variant: 'secondary' },
    { id: 'import', icon: Upload, label: 'Import', variant: 'secondary' },
    { id: 'export', icon: Download, label: 'Export', variant: 'secondary' },
    { id: 'share', icon: Share2, label: 'Share', variant: 'secondary' },
    { id: 'new-action', icon: Plus, label: 'New Action', variant: 'primary' },
  ];

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-1">
        <span className="text-sm font-medium text-gray-700 mr-3">Tool bar</span>
        <span className="text-gray-400 mr-4">{'>'}</span>
        
        {buttons.slice(0, -1).map((button) => (
          <button
            key={button.id}
            onClick={() => onAction(button.id)}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
          >
            <button.icon className="w-4 h-4" />
            <span>{button.label}</span>
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onAction('new-action')}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>New Action</span>
      </button>
    </div>
  );
};

export default Toolbar;