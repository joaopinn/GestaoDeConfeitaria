const express = require('express');
const router = express.Router();
const EncomendaController = require('../controllers/EncomendaController');

// Rota 1: Criar Venda
router.post('/', EncomendaController.criar);
// Rota 2: Listar Vendas
router.get('/', EncomendaController.listar);
// Rota 3: Mudar Status (Avançar o pedido)
router.put('/:id/status', EncomendaController.atualizarStatus);

module.exports = router;