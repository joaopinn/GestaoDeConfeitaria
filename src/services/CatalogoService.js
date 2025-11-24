const Produto = require('../models/CatalogoModel');

const CatalogoService = {
    // 1. GET /api/catalogo
    listarCatalogo: async () => {
        // Traz apenas os ativos para o cardápio
        return await Produto.find({ status: 'ATIVO' }).populate('receita.insumo');
    },

    // 2. GET /api/catalogo/:id 
    buscarCatalogoPorId: async (id) => {
        const produto = await Produto.findById(id).populate('receita.insumo');
        if (!produto) throw new Error('Produto não encontrado');
        return produto;
    },

    // 3. POST /api/catalogo
    criarItemCatalogo: async (data) => {
        const novoBolo = new Produto(data);
        await novoBolo.calcularCusto(); // Calcula custo antes de salvar
        return novoBolo; // O save já ocorreu dentro do calcularCusto
    },

    // 4. PUT /api/catalogo/:id 
    atualizarItemCatalogo: async (id, data) => {
        const produto = await Produto.findById(id);
        if (!produto) throw new Error('Produto não encontrado');

        // Atualiza os campos enviados
        Object.assign(produto, data);

        // Se a receita foi alterada, recalcula o custo. Se não, só salva.
        if (data.receita) {
            await produto.calcularCusto();
        } else {
            await produto.save();
        }
        return produto;
    },

    // 5. DELETE /api/catalogo/:id 
    removerItemCatalogo: async (id) => {
        // Soft Delete: Não apaga do banco, só muda status para INATIVO
        // Assim não quebra o histórico de vendas antigas
        const produto = await Produto.findByIdAndUpdate(
            id,
            { status: 'INATIVO' },
            { new: true }
        );
        if (!produto) throw new Error('Produto não encontrado');
        return produto;
    }
};

module.exports = CatalogoService;