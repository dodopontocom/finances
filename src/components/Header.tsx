import React from 'react';
import { CreditCard, DollarSign, ChevronDown } from 'lucide-react';
import { getCurrentMonth } from '../utils/dateUtils';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-primary" />
            <h1 className="ml-2 text-xl font-semibold text-text-primary">C.O.N.tas</h1>
          </div>
          
          <nav className="flex space-x-1">
            <button
              onClick={() => onTabChange('expenses')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'expenses' 
                  ? 'bg-primary text-white' 
                  : 'text-text-secondary hover:bg-gray-100'
              }`}
            >
              Despesas
            </button>
            <button
              onClick={() => onTabChange('income')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'income' 
                  ? 'bg-primary text-white' 
                  : 'text-text-secondary hover:bg-gray-100'
              }`}
            >
              Entradas
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;