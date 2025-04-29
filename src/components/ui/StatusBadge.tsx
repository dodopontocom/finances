import React from 'react';
import { TransactionStatus } from '../../types/finance';
import { getStatusColor } from '../../utils/financeUtils';

interface StatusBadgeProps {
  status: TransactionStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusLabels: Record<TransactionStatus, string> = {
    paid: 'Paid',
    pending: 'Pending',
    upcoming: 'Upcoming',
    overdue: 'Overdue',
  };

  const colorClass = getStatusColor(status);

  return (
    <span className={`${colorClass} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
      {statusLabels[status]}
    </span>
  );
};

export default StatusBadge;