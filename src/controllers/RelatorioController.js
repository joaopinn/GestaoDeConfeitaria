const gerarRelatorio = require('../services/RelatorioService');

/**
 * Controller para gerar relatório
 * Query params esperados:
 * - tipo: 'vendas' | 'produtos' | 'estoque'
 * - inicio: data de início (string ISO ou timestamp)
 * - fim: data de fim (string ISO ou timestamp)
 * - salvar: 'true' | 'false' (opcional, default false)
 */
async function gerarRelatorioController(req, res) {
    try {
        const { tipo, inicio, fim, salvar } = req.query;

        // Validação básica
        if (!tipo) {
            return res.status(400).json({ 
                error: 'Parâmetro "tipo" é obrigatório. Use "vendas", "produtos" ou "estoque".' 
            });
        }

        if (!inicio || !fim) {
            return res.status(400).json({ 
                error: 'Parâmetros "inicio" e "fim" são obrigatórios.' 
            });
        }

        // Converte string "true"/"false" para boolean
        const salvarBoolean = salvar === 'true';

        const resultado = await gerarRelatorio({
            tipo,
            inicio,
            fim,
            salvar: salvarBoolean
        });

        return res.status(200).json(resultado);
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        return res.status(500).json({ 
            error: error.message || 'Erro ao gerar relatório' 
        });
    }
}

/**
 * Controller alternativo para gerar relatório via POST
 * Body esperado:
 * {
 *   "tipo": "vendas" | "produtos" | "estoque",
 *   "inicio": "2024-01-01",
 *   "fim": "2024-12-31",
 *   "salvar": true | false
 * }
 */
async function gerarRelatorioPostController(req, res) {
    try {
        const { tipo, inicio, fim, salvar } = req.body;

        // Validação básica
        if (!tipo) {
            return res.status(400).json({ 
                error: 'Campo "tipo" é obrigatório. Use "vendas", "produtos" ou "estoque".' 
            });
        }

        if (!inicio || !fim) {
            return res.status(400).json({ 
                error: 'Campos "inicio" e "fim" são obrigatórios.' 
            });
        }

        const resultado = await gerarRelatorio({
            tipo,
            inicio,
            fim,
            salvar: salvar || false
        });

        return res.status(200).json(resultado);
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        return res.status(500).json({ 
            error: error.message || 'Erro ao gerar relatório' 
        });
    }
}

export {
    gerarRelatorioController,
    gerarRelatorioPostController
};
