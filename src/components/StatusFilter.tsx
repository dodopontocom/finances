import React from 'react';
import { TransactionStatus } from '../types/finance';

interface StatusFilterProps {
  activeFilter: TransactionStatus | 'all';
  onFilterChange: (status: TransactionStatus | 'all') => void;
  counts: Record<TransactionStatus | 'all', number>;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ 
  activeFilter, 
  onFilterChange,
  counts
}) => {
  const filters: Array<{ value: TransactionStatus | 'all', label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'paid', label: 'Paid' },
  ];

  const getFilterColor = (status: TransactionStatus | 'all') => {
    switch (status) {
      case 'all':
        return activeFilter === 'all' ? 'bg-gray-200' : 'bg-transparent';
      case 'paid':
        return activeFilter === 'paid' ? 'bg-primary text-white' : 'bg-primary/10 text-primary';
      case 'pending':
        return activeFilter === 'pending' ? 'bg-secondary text-white' : 'bg-secondary/10 text-secondary';
      case 'upcoming':
        return activeFilter === 'upcoming' ? 'bg-warning text-white' : 'bg-warning/10 text-warning';
      case 'overdue':
        return activeFilter === 'overdue' ? 'bg-danger text-white' : 'bg-danger/10 text-danger';
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${getFilterColor(filter.value)}`}
        >
          {filter.label} ({counts[filter.value]})
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;