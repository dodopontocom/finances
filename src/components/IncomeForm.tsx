import React, { useState, useEffect } from 'react';
import { Income, PaymentPerson } from '../types/finance';
import { useFinance } from '../contexts/FinanceContext';
import { X } from 'lucide-react';

interface IncomeFormProps {
  income?: Income;
  onClose: () => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ income, onClose }) => {
  const { addIncome, updateIncome } = useFinance();
  const [formData, setFormData] = useState<Omit<Income, 'id' | 'createdAt'>>({
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    receivedBy: 'partner1',
    category: 'Salary',
    isRecurring: false,
  });

  const categories = [
    'Salary', 'Bonus', 'Rental Income', 'Investments', 'Side Hustle', 'Other'
  ];

  useEffect(() => {
    if (income) {
      setFormData({
        description: income.description,
        amount: income.amount,
        date: income.date,
        receivedBy: income.receivedBy,
        category: income.category,
        isRecurring: income.isRecurring,
      });
    }
  }, [income]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (name === 'amount') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (income) {
      updateIncome(income.id, formData);
    } else {
      addIncome(formData);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md animate-slide-up overflow-hidden">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">
            {income ? 'Edit Income' : 'Add New Income'}
          </h2>
          <button 
            onClick={onClose}
            className="text-text-secondary hover:text-danger"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-text-secondary mb-1">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-text-secondary mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="receivedBy" className="block text-sm font-medium text-text-secondary mb-1">
                Received By
              </label>
              <select
                id="receivedBy"
                name="receivedBy"
                value={formData.receivedBy}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="partner1">Partner 1</option>
                <option value="partner2">Partner 2</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-text-secondary mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isRecurring"
                name="isRecurring"
                checked={formData.isRecurring}
                onChange={handleChange}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="isRecurring" className="ml-2 text-sm font-medium text-text-secondary">
                Recurring Monthly Income
              </label>
            </div>
            
            <div className="flex justify-end pt-4 space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-text-secondary hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                {income ? 'Update' : 'Add'} Income
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeForm;