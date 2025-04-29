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
    category: 'Outros',
  });

  const categories = [
    'Moradia', 'Utilidades', 'Mercado', 'Transporte', 
    'Saúde', 'Lazer', 'Alimentação', 'Seguros', 'Outros'
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
            {expense ? 'Editar Despesa' : 'Adicionar Nova Despesa'}
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
                Descrição
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
                Valor
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
                Data de Vencimento
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
                Pago por
              </label>
              <select
                id="paidBy"
                name="paidBy"
                value={formData.paidBy}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="partner1">Thaís</option>
                <option value="partner2">Rodolfo</option>
                <option value="shared">Compartilhado</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-text-secondary mb-1">
                Categoria
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
                  <option value="pending">Pendente</option>
                  <option value="upcoming">Futuro</option>
                  <option value="overdue">Atrasado</option>
                  <option value="paid">Pago</option>
                </select>
              </div>
            )}
            
            <div className="flex justify-end pt-4 space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-text-secondary hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                {expense ? 'Atualizar' : 'Adicionar'} Despesa
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;