import React, { useState, useEffect } from 'react';
import { Expense, PaymentPerson, TransactionStatus } from '../types/finance';
import { useFinance } from '../contexts/FinanceContext';
import { X } from 'lucide-react';

interface ExpenseFormProps {
  expense?: Expense;
  onClose: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, onClose }) => {
  const { addExpense, updateExpense } = useFinance();
  const [formData, setFormData] = useState<Omit<Expense, 'id' | 'createdAt'>>({
    description: '',
    amount: 0,
    dueDate: new Date().toISOString().split('T')[0],
    paidBy: 'shared',
    status: 'pending',
    category: 'Other',
  });

  const categories = [
    'Housing', 'Utilities', 'Groceries', 'Transportation', 
    'Healthcare', 'Entertainment', 'Dining', 'Insurance', 'Other'
  ];

  useEffect(() => {
    if (expense) {
      setFormData({
        description: expense.description,
        amount: expense.amount,
        dueDate: expense.dueDate,
        paidBy: expense.paidBy,
        status: expense.status,
        category: expense.category,
      });
    }
  }, [expense]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0,
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
    
    if (expense) {
      updateExpense(expense.id, formData);
    } else {
      addExpense(formData);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md animate-slide-up overflow-hidden">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">
            {expense ? 'Edit Expense' : 'Add New Expense'}
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
              <label htmlFor="dueDate" className="block text-sm font-medium text-text-secondary mb-1">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="paidBy" className="block text-sm font-medium text-text-secondary mb-1">
                Paid By
              </label>
              <select
                id="paidBy"
                name="paidBy"
                value={formData.paidBy}
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
            
            {expense && (
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-text-secondary mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="pending">Pending</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="overdue">Overdue</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            )}
            
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
                {expense ? 'Update' : 'Add'} Expense
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;