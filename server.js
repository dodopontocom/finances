const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB conectado com sucesso.");
}).catch((err) => {
  console.error("Erro ao conectar ao MongoDB:", err);
});


const app = express();

// Configurações
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'segredo-basico',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 } // 30 dias
}));

app.use(cookieParser());
app.use(session({
  secret: 'segredo-simples',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 } // 30 dias
}));

function verificarLogin(req, res, next) {
  if (req.session && req.session.autenticado) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Rotas
const authRoutes = require('./routes/auth');
const contasRoutes = require('./routes/contas');

app.use(authRoutes);
app.use('/contas', verificarLogin, contasRoutes);

// Inicialização
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
