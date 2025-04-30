const Conta = require('../models/Conta');
const Entrada = require('../models/Entrada');

async function listarContas(req, res) {
  const filtro = req.query.status;
  let query = {};
  if (filtro) query.status = filtro;

  const contas = await Conta.find(query).sort({ vencimento: 1 });
  const entradas = await Entrada.find().sort({ data: -1 });

  const receitaTotal = entradas.reduce((soma, e) => soma + e.valor, 0);
  const contasPagas = await Conta.find({ status: 'pago' });
  const gastosTotais = contasPagas.reduce((soma, c) => soma + c.valor, 0);

  res.render('dashboard', {
    contas,
    entradas,
    filtro,
    receitaTotal,
    gastosTotais
  });
}


async function mostrarFormularioCriar(req, res) {
  res.render('novaConta');
}

async function criarConta(req, res) {
  await Conta.create(req.body);
  res.redirect('/contas');
}

async function mostrarFormularioEditar(req, res) {
  const conta = await Conta.findById(req.params.id);
  res.render('editarConta', { conta });
}

async function atualizarConta(req, res) {
  await Conta.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/contas');
}

async function excluirConta(req, res) {
  await Conta.findByIdAndDelete(req.params.id);
  res.redirect('/contas');
}

module.exports = {
  listarContas,
  mostrarFormularioCriar,
  criarConta,
  mostrarFormularioEditar,
  atualizarConta,
  excluirConta
};
