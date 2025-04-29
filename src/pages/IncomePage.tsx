import React, { useState } from 'react';
import { useFinance } from '../contexts/FinanceContext';
import { Income } from '../types/finance';
import IncomeCard from '../components/IncomeCard';
import IncomeForm from '../components/IncomeForm';
import FinancialSummary from '../components/FinancialSummary';
import { Plus } from 'lucide-react';

const IncomePage: React.FC = () => {
  const { incomes, currentMonth } = useFinance();
  const [showForm, setShowForm] = useState(false);
  const [editingIncome, setEditingIncome] = useState<Income | undefined>(undefined);

  const handleEdit = (income: Income) => {
    setEditingIncome(income);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingIncome(undefined);
  };

  // Filter incomes for current month
  const currentMonthIncomes = incomes.filter(
    income => new Date(income.date).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric'
    }) === currentMonth
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <FinancialSummary />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Entrada</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          <Plus size={18} className="mr-1" />
          Adicionar Entrada
        </button>
      </div>
      
      {currentMonthIncomes.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-text-secondary">Nenhuma receita encontrada este mês.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentMonthIncomes.map(income => (
            <IncomeCard
              key={income.id}
              income={income}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
      
      {showForm && (
        <IncomeForm
          income={editingIncome}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default IncomePage;