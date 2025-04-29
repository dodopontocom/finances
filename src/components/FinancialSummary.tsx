import React from 'react';
import { useFinance } from '../contexts/FinanceContext';
import { formatCurrency, formatDate } from '../utils/dateUtils';
import { TrendingDown, TrendingUp, Calendar } from 'lucide-react';

const FinancialSummary: React.FC = () => {
  const { summary, currentMonth } = useFinance();
  const { totalIncome, totalExpenses, balance, negativeDate } = summary;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold mb-3 flex items-center">
        <Calendar size={18} className="mr-2 text-secondary" />
        Resumo de {currentMonth}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-secondary/10 rounded-lg p-3">
          <p className="text-sm text-text-secondary">Receita Total</p>
          <p className="text-xl font-semibold text-primary flex items-center">
            <TrendingUp size={18} className="mr-1" />
            {formatCurrency(totalIncome)}
          </p>
        </div>
        
        <div className="bg-danger/10 rounded-lg p-3">
          <p className="text-sm text-text-secondary">Despesas Totais</p>
          <p className="text-xl font-semibold text-danger flex items-center">
            <TrendingDown size={18} className="mr-1" />
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        
        <div className={`${balance >= 0 ? 'bg-primary/10' : 'bg-danger/10'} rounded-lg p-3`}>
          <p className="text-sm text-text-secondary">Saldo</p>
          <p className={`text-xl font-semibold ${balance >= 0 ? 'text-primary' : 'text-danger'}`}>
            {formatCurrency(balance)}
          </p>
        </div>
      </div>
      
      {negativeDate && (
        <div className="mt-4 p-3 bg-warning/10 rounded-lg">
          <p className="text-sm font-medium text-danger flex items-center">
            <TrendingDown size={16} className="mr-1" />
            Seu saldo ficará negativo em {formatDate(negativeDate)}
          </p>
        </div>
      )}

      {!negativeDate && balance >= 0 && (
        <div className="mt-4 p-3 bg-primary/10 rounded-lg">
          <p className="text-sm font-medium text-primary flex items-center">
            <TrendingUp size={16} className="mr-1" />
            Você manterá um saldo positivo durante todo o mês
          </p>
        </div>
      )}
    </div>
  );
};

export default FinancialSummary;