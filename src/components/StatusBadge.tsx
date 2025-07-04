import React from 'react';

interface StatusBadgeProps {
  status: 'In-progress' | 'Needs to start' | 'Complete' | 'Blocked';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Complete':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Blocked':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Needs to start':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;