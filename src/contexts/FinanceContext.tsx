import React, { createContext, useContext, useState, useEffect } from 'react';
import { Expense, Income, FinancialSummary, TransactionStatus } from '../types/finance';
import { calculateMonthlySummary, updateExpenseStatus, generateId, calculateStatus } from '../utils/financeUtils';
import { getCurrentMonth } from '../utils/dateUtils';
import { connectDB, collections } from '../lib/db';

interface FinanceContextType {
  expenses: Expense[];
  incomes: Income[];
  loading: boolean;
  error: string | null;
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => Promise<void>;
  updateExpense: (id: string, expense: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  addIncome: (income: Omit<Income, 'id' | 'createdAt'>) => Promise<void>;
  updateIncome: (id: string, income: Partial<Income>) => Promise<void>;
  deleteIncome: (id: string) => Promise<void>;
  filteredExpenses: (status?: TransactionStatus) => Expense[];
  currentMonth: string;
  setCurrentMonth: (month: string) => void;
  summary: FinancialSummary;
  refreshData: () => Promise<void>;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>(getCurrentMonth());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carrega os dados iniciais
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [expensesData, incomesData] = await Promise.all([
        collections.expenses.find().sort({ dueDate: 1 }).toArray() as Promise<Expense[]>,
        collections.incomes.find().sort({ date: 1 }).toArray() as Promise<Income[]>,
      ]);

      setExpenses(updateExpenseStatus(expensesData));
      setIncomes(incomesData);
    } catch (err) {
      console.error('Failed to load data:', err);
      setError('Falha ao carregar dados. Tente recarregar a página.');
    } finally {
      setLoading(false);
    }
  };

  // Conecta ao banco de dados e carrega os dados
  useEffect(() => {
    const initialize = async () => {
      try {
        await connectDB();
        await loadData();
      } catch (err) {
        console.error('Failed to initialize database:', err);
        setError('Falha na conexão com o banco de dados.');
      }
    };

    initialize();

    // Atualiza status das despesas diariamente
    const interval = setInterval(() => {
      setExpenses(prev => updateExpenseStatus(prev));
    }, 86400000); // 24 horas

    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    await loadData();
  };

  const addExpense = async (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    try {
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

      await collections.expenses.insertOne(newExpense);
      setExpenses(prev => [...prev, newExpense]);
    } catch (err) {
      console.error('Failed to add expense:', err);
      throw new Error('Falha ao adicionar despesa.');
    }
  };

  const updateExpense = async (id: string, updates: Partial<Expense>) => {
    try {
      const result = await collections.expenses.updateOne(
        { id },
        { $set: updates }
      );

      if (result.modifiedCount === 0) {
        throw new Error('Despesa não encontrada.');
      }

      setExpenses(prev =>
        prev.map(expense =>
          expense.id === id ? { ...expense, ...updates } : expense
        )
      );
    } catch (err) {
      console.error('Failed to update expense:', err);
      throw new Error('Falha ao atualizar despesa.');
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const result = await collections.expenses.deleteOne({ id });

      if (result.deletedCount === 0) {
        throw new Error('Despesa não encontrada.');
      }

      setExpenses(prev => prev.filter(expense => expense.id !== id));
    } catch (err) {
      console.error('Failed to delete expense:', err);
      throw new Error('Falha ao remover despesa.');
    }
  };

  const addIncome = async (income: Omit<Income, 'id' | 'createdAt'>) => {
    try {
      const newIncome: Income = {
        ...income,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };

      await collections.incomes.insertOne(newIncome);
      setIncomes(prev => [...prev, newIncome]);
    } catch (err) {
      console.error('Failed to add income:', err);
      throw new Error('Falha ao adicionar receita.');
    }
  };

  const updateIncome = async (id: string, updates: Partial<Income>) => {
    try {
      const result = await collections.incomes.updateOne(
        { id },
        { $set: updates }
      );

      if (result.modifiedCount === 0) {
        throw new Error('Receita não encontrada.');
      }

      setIncomes(prev =>
        prev.map(income =>
          income.id === id ? { ...income, ...updates } : income
        )
      );
    } catch (err) {
      console.error('Failed to update income:', err);
      throw new Error('Falha ao atualizar receita.');
    }
  };

  const deleteIncome = async (id: string) => {
    try {
      const result = await collections.incomes.deleteOne({ id });

      if (result.deletedCount === 0) {
        throw new Error('Receita não encontrada.');
      }

      setIncomes(prev => prev.filter(income => income.id !== id));
    } catch (err) {
      console.error('Failed to delete income:', err);
      throw new Error('Falha ao remover receita.');
    }
  };

  const filteredExpenses = (status?: TransactionStatus) => {
    const monthExpenses = expenses.filter(
      expense => new Date(expense.dueDate).toLocaleDateString('pt-BR', { 
        month: 'long', 
        year: 'numeric' 
      }) === currentMonth
    );
    
    return status 
      ? monthExpenses.filter(expense => expense.status === status)
      : monthExpenses;
  };

  // Calcula o resumo financeiro
  const summary = calculateMonthlySummary(expenses, incomes, currentMonth);

  const value = {
    expenses,
    incomes,
    loading,
    error,
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
    refreshData,
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