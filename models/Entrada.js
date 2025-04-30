const mongoose = require('mongoose');

const entradaSchema = new mongoose.Schema({
  descricao: String,
  valor: Number,
  data: Date
});

module.exports = mongoose.model('Entrada', entradaSchema);

