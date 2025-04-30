// scripts/popular.js
const mongoose = require('mongoose');
const Conta = require('../models/Conta');
require('dotenv').config();

async function popular() {
  await mongoose.connect(process.env.MONGO_URI);
  await Conta.deleteMany();

  await Conta.insertMany([
    { nome: 'Aluguel', vencimento: '05/05', valor: 1200.00, status: 'pago' },
    { nome: 'Energia', vencimento: '10/05', valor: 230.50, status: 'pendente' },
    { nome: 'Internet', vencimento: '15/05', valor: 99.90, status: 'atrasado' },
  ]);

  console.log('Contas inseridas com sucesso.');
  process.exit();
}

popular();

