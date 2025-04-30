import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI não configurada nas variáveis de ambiente');
}

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db('finances');

// Função para criar índices
const createIndexes = async () => {
  try {
    await db.collection('expenses').createIndex({ id: 1 }, { unique: true });
    await db.collection('expenses').createIndex({ dueDate: 1 });
    await db.collection('expenses').createIndex({ status: 1 });
    
    await db.collection('incomes').createIndex({ id: 1 }, { unique: true });
    await db.collection('incomes').createIndex({ date: 1 });
    console.log('Índices criados com sucesso');
  } catch (error) {
    console.error('Erro ao criar índices:', error);
  }
};

export const connectDB = async () => {
  try {
    await client.connect();
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

export const collections = {
  expenses: db.collection('expenses'),
  incomes: db.collection('incomes'),
};