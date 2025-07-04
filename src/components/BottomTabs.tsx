import React from 'react';
import { Plus } from 'lucide-react';

interface BottomTab {
  id: string;
  label: string;
  active: boolean;
}

interface BottomTabsProps {
  tabs: BottomTab[];
  onTabChange: (tabId: string) => void;
}

const BottomTabs: React.FC<BottomTabsProps> = ({ tabs, onTabChange }) => {
  return (
    <div className="bg-white border-t border-gray-200">
      <div className="flex items-center px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab.active
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
        
        <button className="ml-2 p-2 text-gray-400 hover:text-gray-600">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      {/* Blue progress bar */}
      <div className="h-1 bg-gray-100">
        <div className="h-full w-1/2 bg-blue-500"></div>
      </div>
    </div>
  );
};

export default BottomTabs;