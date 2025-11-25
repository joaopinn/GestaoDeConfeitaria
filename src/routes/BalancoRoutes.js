const express = require('express');
const router = express.Router();
const BalancoController = require('../controllers/BalancoController');

// Rota: GET /api/balanco
router.get('/', BalancoController.obterDadosDashboard);

module.exports = router;