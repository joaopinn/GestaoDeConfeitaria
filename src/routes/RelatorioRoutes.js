const express = require('express');
const router = express.Router();

// Importando o Controller (Garçom)
// Certifique-se que o arquivo RelatorioController.js está exportando essas funções corretamente
const RelatorioController = require('../controllers/RelatorioController');

/**
 * GET /api/relatorios/gerar
 * Gera relatório via query params
 * * Exemplo de uso:
 * GET http://localhost:3000/api/relatorios/gerar?tipo=vendas&inicio=2024-01-01&fim=2024-12-31&salvar=true
 */
// Acessamos a função dentro do objeto importado
router.get('/gerar', RelatorioController.gerarRelatorioController);

/**
 * POST /api/relatorios/gerar
 * Gera relatório via body
 * * Exemplo de body:
 * {
 * "tipo": "vendas",
 * "inicio": "2024-01-01",
 * "fim": "2024-12-31",
 * "salvar": true
 * }
 */
router.post('/gerar', RelatorioController.gerarRelatorioPostController);

// Exportação padrão do Node.js
module.exports = router;