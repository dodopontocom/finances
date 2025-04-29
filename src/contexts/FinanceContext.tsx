import React, { createContext, useContext, useState, useEffect } from 'react';
import { Expense, Income, FinancialSummary, TransactionStatus } from '../types/finance';
import { calculateMonthlySummary, updateExpenseStatus, generateId } from '../utils/financeUtils';
import { getCurrentMonth } from '../utils/dateUtils';

interface FinanceContextType {
  expenses: Expense[];
  incomes: Income[];
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  addIncome: (income: Omit<Income, 'id' | 'createdAt'>) => void;
  updateIncome: (id: string, income: Partial<Income>) => void;
  deleteIncome: (id: string) => void;
  filteredExpenses: (status?: TransactionStatus) => Expense[];
  currentMonth: string;
  setCurrentMonth: (month: string) => void;
  summary: FinancialSummary;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// Sample data
const initialExpenses: Expense[] = [
  {
    id: generateId(),
    description: 'Rent',
    amount: 1200,
    dueDate: '2025-04-01',
    paidBy: 'shared',
    status: 'pending',
    category: 'Housing',
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    description: 'Electricity Bill',
    amount: 85,
    dueDate: '2025-04-15',
    paidBy: 'partner1',
    status: 'pending',
    category: 'Utilities',
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    description: 'Internet',
    amount: 60,
    dueDate: '2025-04-10',
    paidBy: 'partner2',
    status: 'paid',
    category: 'Utilities',
    createdAt: new Date().toISOString(),
  },
];

const initialIncomes: Income[] = [
  {
    id: generateId(),
    description: 'Salary - Thaís',
    amount: 3500,
    date: '2025-04-05',
    receivedBy: 'partner1',
    category: 'Salary',
    isRecurring: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    description: 'Salary - Rodolfo',
    amount: 4000,
    date: '2025-04-10',
    receivedBy: 'partner2',
    category: 'Salary',
    isRecurring: true,
    createdAt: new Date().toISOString(),
  },
];

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [incomes, setIncomes] = useState<Income[]>(initialIncomes);
  const [currentMonth, setCurrentMonth] = useState<string>(getCurrentMonth());

  useEffect(() => {
    // Update statuses based on current date
    setExpenses(prev => updateExpenseStatus(prev));
  }, []);

  const addExpense = (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expense,
      id: generateId(),
      createdAt: new Date().toISOString(),
      status: expense.status || calculateStatus({
        ...expense,
        id: '',
        createdAt: '',
        status: 'pending',
      } as Expense),
    };
    setExpenses(prev => [...prev, newExpense]);
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === id ? { ...expense, ...updates } : expense
      )
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const addIncome = (income: Omit<Income, 'id' | 'createdAt'>) => {
    const newIncome: Income = {
      ...income,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setIncomes(prev => [...prev, newIncome]);
  };

  const updateIncome = (id: string, updates: Partial<Income>) => {
    setIncomes(prev => 
      prev.map(income => 
        income.id === id ? { ...income, ...updates } : income
      )
    );
  };

  const deleteIncome = (id: string) => {
    setIncomes(prev => prev.filter(income => income.id !== id));
  };

  const filteredExpenses = (status?: TransactionStatus) => {
    // First filter by current month
    const monthExpenses = expenses.filter(
      expense => new Date(expense.dueDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) === currentMonth
    );
    
    // Then filter by status if provided
    return status 
      ? monthExpenses.filter(expense => expense.status === status)
      : monthExpenses;
  };

  // Calculate summary whenever expenses, incomes, or current month changes
  const summary = calculateMonthlySummary(expenses, incomes, currentMonth);

  const value = {
    expenses,
    incomes,
    addExpense,
    updateExpense,
    deleteExpense,
    addIncome,
    updateIncome,
    deleteIncome,
    filteredExpenses,
    currentMonth,
    setCurrentMonth,
    summary,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};