const EncomendaService = require('../services/EncomendaService');

const EncomendaController = {
    // POST criar vendar
    criar: async (req, res) => {
        try {
            // req.body contem : { cliente, itens, dataEntrega }
            const novaEncomenda = await EncomendaService.criarEncomenda(req.body);

            // Retorna 201 (created)
            return res.status(201).json(novaEncomenda);
        } catch (error) {
            // Retorna 400 (bad request) se der erro na validação
            return res.status(400).json({
                error: 'Erro ao percorrer venda.',
                details: error.message
            });
            
        }
    },

    // GET listar todas
    listar: async (req, res) => {
        try {
            const filtros = req.query;

            const vendas = await EncomendaService.listarEncomendas(filtros);

            return res.json(vendas);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // PUT atualizar andamento
    atualizarStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;7

            const encomendaAtualizada = await EncomendaService.atualizarStatus(id, status);

            return res.json(encomendaAtualizada);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};

module.exports = EncomendaController;