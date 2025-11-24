const express = require('express');
const InsumoController = require('../controllers/InsumoControlles');
const router = express.Router();

router.get('/', InsumoController.getListInsumosController);
router.get('/:id', InsumoController.getListInsumosByIdController);
router.post('/', InsumoController.createInsumoController);
router.put('/:id', InsumoController.atualizarInsumoPorIdController);
router.patch('/:id/estoque', InsumoController.atualizarEstoqueDeInsumoController);
router.delete('/:id', InsumoController.deletarInsumoPorIdController);

module.exports = router;