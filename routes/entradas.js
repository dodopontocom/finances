const express = require('express');
const router = express.Router();
const controller = require('../controllers/entradasController');

router.get('/entradas', controller.listarEntradas);
router.get('/entradas/nova', controller.mostrarFormulario);
router.post('/entradas', controller.criarEntrada);
router.post('/entradas/:id/deletar', controller.deletarEntrada);

module.exports = router;

