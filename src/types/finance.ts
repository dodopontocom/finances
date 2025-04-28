export type TransactionStatus = 'pending' | 'upcoming' | 'overdue' | 'paid';

export type PaymentPerson = 'partner1' | 'partner2' | 'shared';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  dueDate: string; // YYYY-MM-DD
  paidBy: PaymentPerson;
  status: TransactionStatus;
  category: string;
  createdAt: string;
}

export interface Income {
  id: string;
  description: string;
  amount: number;
  date: string; // YYYY-MM-DD
  receivedBy: PaymentPerson;
  category: string;
  isRecurring: boolean;
  createdAt: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  negativeDate: string | null; // The date when balance will go negative, null if it won't
}