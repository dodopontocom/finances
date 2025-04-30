import { collections } from './db';

export const createIndexes = async () => {
  await collections.expenses.createIndex({ id: 1 }, { unique: true });
  await collections.expenses.createIndex({ dueDate: 1 });
  await collections.expenses.createIndex({ status: 1 });
  
  await collections.incomes.createIndex({ id: 1 }, { unique: true });
  await collections.incomes.createIndex({ date: 1 });
};

// Chame esta função após conectar ao banco de dados