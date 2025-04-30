const mongoose = require('mongoose');

const contaSchema = new mongoose.Schema({
  nome: String,
  vencimento: String,
  valor: Number,
  status: {
    type: String,
    enum: ['pago', 'pendente', 'atrasado'],
    default: 'pendente'
  }
}, { timestamps: true });

module.exports = mongoose.model('Conta', contaSchema);
