import express from 'express';
import { 
    gerarRelatorioController, 
    gerarRelatorioPostController 
} from '../controllers/RelatorioController.js';

const router = express.Router();

/**
 * GET /relatorios/gerar
 * Gera relatório via query params
 * 
 * Exemplo de uso:
 * GET /relatorios/gerar?tipo=vendas&inicio=2024-01-01&fim=2024-12-31&salvar=true
 */
router.get('/gerar', gerarRelatorioController);

/**
 * POST /relatorios/gerar
 * Gera relatório via body
 * 
 * Exemplo de body:
 * {
 *   "tipo": "vendas",
 *   "inicio": "2024-01-01",
 *   "fim": "2024-12-31",
 *   "salvar": true
 * }
 */
router.post('/gerar', gerarRelatorioPostController);

export default router;
