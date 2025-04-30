const express = require('express');
const router = express.Router();
const controller = require('../controllers/contasController');

router.get('/', controller.listarContas);
router.get('/nova', controller.mostrarFormularioCriar);
router.post('/', controller.criarConta);
router.get('/:id/editar', controller.mostrarFormularioEditar);
router.post('/:id/editar', controller.atualizarConta);
router.post('/:id/excluir', controller.excluirConta);

module.exports = router;
