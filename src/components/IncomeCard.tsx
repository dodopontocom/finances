import React from 'react';
import { Income } from '../types/finance';
import PersonBadge from './ui/StatusBadge';
import { formatCurrency, formatDate } from '../utils/dateUtils';
import { Trash2, Edit, Repeat } from 'lucide-react';
import { useFinance } from '../contexts/FinanceContext';

interface IncomeCardProps {
  income: Income;
  onEdit: (income: Income) => void;
}

const IncomeCard: React.FC<IncomeCardProps> = ({ income, onEdit }) => {
  const { deleteIncome } = useFinance();

  return (
    <div className="bg-card rounded-lg shadow-sm border border-gray-100 p-4 transition-all duration-300 hover:shadow-md animate-fade-in">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-text-primary flex items-center gap-1">
            {income.description}
            {income.isRecurring && (
              <Repeat size={14} className="text-primary" />
            )}
          </h3>
          <p className="text-text-secondary text-sm">{income.category}</p>
        </div>
        <div>
          <span className="font-semibold text-primary">{formatCurrency(income.amount)}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex flex-col text-sm">
          <div className="text-text-secondary">
            <span>Date: {formatDate(income.date)}</span>
          </div>
          <div className="mt-1">
            <PersonBadge status={income.receivedBy} />
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(income)}
            className="p-1.5 rounded-full text-secondary hover:bg-secondary hover:text-white transition-colors"
            title="Edit income"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={() => deleteIncome(income.id)}
            className="p-1.5 rounded-full text-danger hover:bg-danger hover:text-white transition-colors"
            title="Delete income"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeCard;