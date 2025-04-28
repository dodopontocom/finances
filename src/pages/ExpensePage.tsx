import React, { useState } from 'react';
import { useFinance } from '../contexts/FinanceContext';
import { Expense, TransactionStatus } from '../types/finance';
import ExpenseCard from '../components/ExpenseCard';
import ExpenseForm from '../components/ExpenseForm';
import StatusFilter from '../components/StatusFilter';
import FinancialSummary from '../components/FinancialSummary';
import { Plus } from 'lucide-react';

const ExpensePage: React.FC = () => {
  const { expenses, filteredExpenses } = useFinance();
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>(undefined);
  const [activeFilter, setActiveFilter] = useState<TransactionStatus | 'all'>('all');

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingExpense(undefined);
  };

  const displayExpenses = activeFilter === 'all' 
    ? filteredExpenses()
    : filteredExpenses(activeFilter);

  // Calculate counts for filter badges
  const getCounts = () => {
    const counts: Record<TransactionStatus | 'all', number> = {
      all: filteredExpenses().length,
      pending: filteredExpenses('pending').length,
      upcoming: filteredExpenses('upcoming').length,
      overdue: filteredExpenses('overdue').length,
      paid: filteredExpenses('paid').length,
    };
    return counts;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <FinancialSummary />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Expenses</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          <Plus size={18} className="mr-1" />
          Add Expense
        </button>
      </div>
      
      <StatusFilter 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
        counts={getCounts()}
      />
      
      {displayExpenses.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-text-secondary">No expenses found for the selected filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayExpenses.map(expense => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
      
      {showForm && (
        <ExpenseForm
          expense={editingExpense}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default ExpensePage;