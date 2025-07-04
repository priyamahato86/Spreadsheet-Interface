import React from 'react';
import { Search, Bell, Code } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Title and breadcrumbs */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-semibold text-blue-600">Spreadsheet style</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Workspace</span>
            <span className="text-gray-400">{'>'}</span>
            <span>Folder 2</span>
            <span className="text-gray-400">{'>'}</span>
            <span className="font-medium text-gray-900">Spreadsheet 3</span>
            <span className="text-gray-400">⋯</span>
          </div>
        </div>

        {/* Right side - Search, notifications, and user */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search within sheet"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">2</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-900">John Doe</div>
              <div className="text-gray-500">john@doe</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;