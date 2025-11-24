const Encomenda = require("../models/EncomendaModel");
const Produto = require('../models/CatalogoModel');
const Insumo = require('../models/InsumoModel');

const EncomendaService = {

    criarEncomenda: async (dados) => {
        const { cliente, itens, dataEntrega, observacoes } = dados;

        // Calculando valor total (Inicia zerado)
        let valorTotalCalculado = 0;
        const itensTratados = [];

        // Percorrendo cada item que veio do pedido
        for (const itemPedido of itens) {
            
            // Buscando produto no banco para extrair o valor real (e a receita)
            const produtoNoBanco = await Produto.findById(itemPedido.produto).populate('receita.insumo');
            
            // Tratamento de erro
            if (!produtoNoBanco) {
                throw new Error(`Produto ID ${itemPedido.produto} não encontrado.`);
            }

            // Pegando preço do dia (Snapshot)
            const precoDia = produtoNoBanco.precoVenda;
            
            // Adiciona ao total (Preço x Quantidade)
            valorTotalCalculado += (precoDia * itemPedido.quantidade);

            // Prepara o objeto para salvar
            itensTratados.push({
                produto: produtoNoBanco._id,
                quantidade: itemPedido.quantidade,
                // CORREÇÃO: O nome no Model é 'precoUnitarioSnapshot', ajustei aqui:
                precoUnitarioSnapshot: precoDia 
            });

            // Baixa de Estoque
            if (produtoNoBanco.receita) {
                for (const ingrediente of produtoNoBanco.receita) {
                    if (ingrediente.insumo) {
                        // Calcula quanto gastou: (Qtd na Receita) * (Qtd de Bolos Vendidos)
                        const quantidadeParaBaixar = ingrediente.quantidade * itemPedido.quantidade;

                        // Vai no banco e diminui usando $inc negativo
                        await Insumo.findByIdAndUpdate(ingrediente.insumo._id, {
                            // Ajustei o espaçamento para ficar mais seguro
                            $inc: { estoqueAtual: -quantidadeParaBaixar } 
                        });
                    }
                }
            }
        }

        // Gerar Código Simples (o Mongo não tem auto-increment nativo)
        const codigoGerado = Math.floor(1000 + Math.random() * 9000);

        // Salvar a Encomenda
        const novaEncomenda = new Encomenda({
            codigo: codigoGerado,
            cliente,
            itens: itensTratados,     // Usa nossa lista tratada
            valorTotal: valorTotalCalculado, // Usa nosso cálculo seguro
            status: 'PENDENTE',       // Padrão inicial
            dataEntrega,
            observacoes
        });

        return await novaEncomenda.save();
    },

    // Filtros (Mudei para Plural 'listarEncomendas' para padronizar)
    listarEncomendas: async (filtros = {}) => {
        // Por status
        const query = {};
        if (filtros.status) query.status = filtros.status;

        return await Encomenda.find(query)
            .populate('itens.produto', 'nome categoria')
            .sort({ dataEntrega: 1 });
    },

    // Atualizar status (Mudei para Verbo 'atualizarStatus')
    atualizarStatus: async (id, novoStatus) => {
        // Validação
        const statusPermitidos = ['PENDENTE', 'EM_PRODUCAO', 'PRONTA', 'ENTREGUE', 'CANCELADA'];
        
        if (!statusPermitidos.includes(novoStatus)) {
            throw new Error(`Status inválido. Use: ${statusPermitidos.join(', ')}`);
        }

        const encomenda = await Encomenda.findByIdAndUpdate(
            id,
            { status: novoStatus },
            { new: true } // Retorna o dado novo
        );

        if (!encomenda) throw new Error('Encomenda não encontrada');

        return encomenda;
    }
};

module.exports = EncomendaService;