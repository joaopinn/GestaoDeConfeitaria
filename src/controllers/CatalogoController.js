// Importamos o Service que tem as funções com os nomes da tabela
const CatalogoService = require('../services/CatalogoService');

const CatalogoController = {

    // GET / com listarCatalogo()
    listar: async (req, res) => {
        try {
            const produtos = await CatalogoService.listarCatalogo();
            return res.json(produtos);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // GET /:id com buscarCatalogoPorId(id)
    buscarPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const produto = await CatalogoService.buscarCatalogoPorId(id);
            return res.json(produto);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    },

    // POST / com criarItemCatalogo(data)
    criar: async (req, res) => {
        try {
            // req.body é o 'data' da tabela
            const produto = await CatalogoService.criarItemCatalogo(req.body);
            return res.status(201).json(produto);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    // PUT /:id com atualizarItemCatalogo(id, data)
    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const produto = await CatalogoService.atualizarItemCatalogo(id, data);
            return res.json(produto);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    // DELETE /:id com removerItemCatalogo(id)
    remover: async (req, res) => {
        try {
            const { id } = req.params;
            await CatalogoService.removerItemCatalogo(id);
            return res.json({ message: 'Item removido com sucesso.' });
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
};

module.exports = CatalogoController;