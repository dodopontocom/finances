import { Expense, Income, FinancialSummary, TransactionStatus } from '../types/finance';
import { isOverdue, isWithinDays } from './dateUtils';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

export const calculateStatus = (expense: Expense): TransactionStatus => {
  if (expense.status === 'paid') return 'paid';
  if (isOverdue(expense.dueDate)) return 'overdue';
  if (isWithinDays(expense.dueDate, 5)) return 'upcoming';
  return 'pending';
};

export const updateExpenseStatus = (expenses: Expense[]): Expense[] => {
  return expenses.map(expense => {
    if (expense.status !== 'paid') {
      return {
        ...expense,
        status: calculateStatus(expense)
      };
    }
    return expense;
  });
};

export const calculateMonthlySummary = (
  expenses: Expense[],
  incomes: Income[],
  month: string
): FinancialSummary => {
  // Filter for current month - agora usando pt-BR
  const monthExpenses = expenses.filter(
    expense => new Date(expense.dueDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) === month
  );
  
  const monthIncomes = incomes.filter(
    income => new Date(income.date).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) === month
  );

  const totalIncome = monthIncomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = totalIncome - totalExpenses;

  let negativeDate: string | null = null;

  if (balance < 0) {
    // Criar cálculo dia a dia
    const [monthName, year] = month.split(' de ');
    const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
    
    const daysInMonth = new Date(
      parseInt(year), 
      monthIndex + 1, 
      0
    ).getDate();
    
    let runningBalance = 0;
    
    // Ordenar todas as transações por data
    const allTransactions = [
      ...monthIncomes.map(income => ({ date: income.date, amount: income.amount, type: 'income' })),
      ...monthExpenses.map(expense => ({ date: expense.dueDate, amount: -expense.amount, type: 'expense' }))
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Encontrar o primeiro dia em que o saldo fica negativo
    for (const transaction of allTransactions) {
      runningBalance += transaction.amount;
      if (runningBalance < 0 && !negativeDate) {
        negativeDate = transaction.date;
      }
    }
  }
  
  return {
    totalIncome,
    totalExpenses,
    balance,
    negativeDate
  };
};

export const getStatusColor = (status: TransactionStatus): string => {
  switch (status) {
    case 'paid':
      return 'bg-primary text-white';
    case 'pending':
      return 'bg-secondary text-white';
    case 'upcoming':
      return 'bg-warning text-white';
    case 'overdue':
      return 'bg-danger text-white';
    default:
      return 'bg-gray-200 text-gray-700';
  }
};