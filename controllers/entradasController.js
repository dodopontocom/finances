const Entrada = require('../models/Entrada');

async function listarEntradas(req, res) {
  const entradas = await Entrada.find().sort({ data: -1 });
  res.render('entradas', { entradas });
}

async function mostrarFormulario(req, res) {
  res.render('entradaForm');
}

async function criarEntrada(req, res) {
  const { descricao, valor, data } = req.body;
  await Entrada.create({ descricao, valor, data });
  res.redirect('/entradas');
}

async function deletarEntrada(req, res) {
  await Entrada.findByIdAndDelete(req.params.id);
  res.redirect('/entradas');
}

module.exports = { listarEntradas, mostrarFormulario, criarEntrada, deletarEntrada };

