export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
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
  });
};

export const getMonthFromDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { 
    month: 'long', 
    year: 'numeric' 
  });
};

// Adicionei esta nova função para formatar data com hora
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};