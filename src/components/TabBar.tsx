import React from 'react';
import { X } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  color: string;
  active: boolean;
}

interface TabBarProps {
  tabs: Tab[];
  onTabChange: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, onTabChange, onTabClose }) => {
  return (
    <div className="flex items-center bg-gray-200 px-4 py-2">
      <div className="flex items-center space-x-4">
        {/* ABC section */}
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-medium">
          ABC
        </div>
        
        {/* Answer a question section */}
        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm font-medium">
          Answer a question
        </div>
        
        {/* Extract section */}
        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded text-sm font-medium">
          Extract
        </div>
        
        {/* Plus button */}
        <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-300 rounded">
          <span className="text-lg">+</span>
        </button>
      </div>
    </div>
  );
};

export default TabBar;