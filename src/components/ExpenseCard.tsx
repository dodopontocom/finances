import React from 'react';
import { Expense } from '../types/finance';
import StatusBadge from './ui/StatusBadge';
import PersonBadge from './ui/PersonBadge';
import { formatCurrency, formatDate, getDaysUntilDue } from '../utils/dateUtils';
import { Trash2, Edit, CheckCircle } from 'lucide-react';
import { useFinance } from '../contexts/FinanceContext';

interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onEdit }) => {
  const { updateExpense, deleteExpense } = useFinance();
  const daysUntil = getDaysUntilDue(expense.dueDate);
  
  const handleMarkAsPaid = () => {
    updateExpense(expense.id, { status: 'paid' });
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-gray-100 p-4 transition-all duration-300 hover:shadow-md animate-fade-in">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-text-primary">{expense.description}</h3>
          <p className="text-text-secondary text-sm">{expense.category}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-semibold text-text-primary">{formatCurrency(expense.amount)}</span>
          <StatusBadge status={expense.status} />
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex flex-col text-sm">
          <div className="flex items-center gap-1 text-text-secondary">
            <span>Vencimento: {formatDate(expense.dueDate)}</span>
            {expense.status !== 'paid' && expense.status !== 'overdue' && (
              <span className="text-xs text-text-secondary">
                {daysUntil === 0 ? '(Hoje)' : `(em ${daysUntil} dias)`}
              </span>
            )}
          </div>
          <div className="mt-1">
            <PersonBadge person={expense.paidBy} />
          </div>
        </div>
        
        <div className="flex gap-2">
          {expense.status !== 'paid' && (
            <button 
              onClick={handleMarkAsPaid}
              className="p-1.5 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
              title="Marcar como pago"
            >
              <CheckCircle size={18} />
            </button>
          )}
          <button 
            onClick={() => onEdit(expense)}
            className="p-1.5 rounded-full text-secondary hover:bg-secondary hover:text-white transition-colors"
            title="Editar despesa"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={() => deleteExpense(expense.id)}
            className="p-1.5 rounded-full text-danger hover:bg-danger hover:text-white transition-colors"
            title="Excluir despesa"
            >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;