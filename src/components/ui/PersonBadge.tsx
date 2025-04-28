import React from 'react';
import { PaymentPerson } from '../../types/finance';
import { User, Users } from 'lucide-react';

interface PersonBadgeProps {
  person: PaymentPerson;
  type?: 'payer' | 'receiver';
}

const PersonBadge: React.FC<PersonBadgeProps> = ({ person, type = 'payer' }) => {
  const personLabels: Record<PaymentPerson, string> = {
    partner1: 'Partner 1',
    partner2: 'Partner 2',
    shared: 'Shared',
  };

  const getPersonColor = (person: PaymentPerson) => {
    switch (person) {
      case 'partner1':
        return 'bg-secondary-light text-white';
      case 'partner2':
        return 'bg-primary-light text-white';
      case 'shared':
        return 'bg-warning-light text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const colorClass = getPersonColor(person);

  return (
    <span className={`${colorClass} text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1`}>
      {person === 'shared' ? (
        <Users size={12} />
      ) : (
        <User size={12} />
      )}
      {personLabels[person]}
    </span>
  );
};

export default PersonBadge;