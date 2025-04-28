export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }); // Formato: DD/MM/AAAA
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(amount); // Formato: R$ 1.234,56
};

export const getDaysUntilDue = (dueDate: string): number => {
  const now = new Date();
  const due = new Date(dueDate);
  
  // Reset time part for accurate day calculation
  now.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  
  const diffTime = due.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isWithinDays = (dueDate: string, days: number): boolean => {
  const daysUntil = getDaysUntilDue(dueDate);
  return daysUntil >= 0 && daysUntil <= days;
};

export const isOverdue = (dueDate: string): boolean => {
  return getDaysUntilDue(dueDate) < 0;
};

export const getCurrentMonth = (): string => {
  return new Date().toLocaleDateString('pt-BR', { 
    month: 'long', 
    year: 'numeric' 
  }).replace(' de', ''); // Formato: "abril 2024" (sem "de")
};

export const getMonthFromDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { 
    month: 'long', 
    year: 'numeric' 
  }).replace(' de', ''); // Formato: "abril 2024" (sem "de")
};