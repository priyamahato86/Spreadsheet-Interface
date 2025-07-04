import React from 'react';

interface PriorityBadgeProps {
  priority: 'Low' | 'Medium' | 'High';
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getPriorityStyles = () => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'Low':
        return 'bg-green-50 text-green-600 border-green-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${getPriorityStyles()}`}>
      {priority}
    </span>
  );
};

export default PriorityBadge;