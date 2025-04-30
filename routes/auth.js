const express = require('express');
const router = express.Router();

const USUARIO = 'admin';
const SENHA = 'iso900222';

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  if (usuario === USUARIO && senha === SENHA) {
    req.session.autenticado = true;
    res.redirect('/contas');
  } else {
    res.render('login', { erro: 'Usuário ou senha incorretos' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
