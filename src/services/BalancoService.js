const Encomenda = require('../models/EncomendaModel');

const BalancoService = {

    gerarBalanco: async (mes, ano) => {
        // Define o intervalo de tempo
        const dataInicio = new Date(ano, mes - 1, 1);
        const dataFim = new Date(ano, mes, 0, 23, 59, 59);

        // Busca vendas confirmadas (ignora canceladas)
        const vendas = await Encomenda.find({
            dataEntrega: { $gte: dataInicio, $lte: dataFim },
            status: { $ne: 'CANCELADA' }
        }).populate('itens.produto');

        let receitaTotal = 0;
        let custoTotal = 0;
        let totalBolos = 0;

        // Loop Matematico
        for(const venda of vendas) {
            receitaTotal += venda.valorTotal;

            for(const item of venda.itens) {
                if (item.produto) {
                    totalBolos += item.quantidade;

                    // Pega o custo calculado no CatalogoModel ou considera 0 se nao estiver calculado
                    const custoUnitario = item.produto.custoProducao || 0;
                    custoTotal += (custoUnitario * item.quantidade);
                }
            }
        }

        // Resultados finais
        const lucroLiquido = receitaTotal - custoTotal;

        // Fórmula: (Lucro/Receita) * 100
        // Evita divisão por 0
        const margem = receitaTotal > 0 ? ((lucroLiquido / receitaTotal) * 100).toFixed(1) : 0;

        const ticketMedio = vendas.length > 0 ? (receitaTotal / vendas.length).toFixed(2) : 0;

        // Retorna o objeto pronto para o grafico no Front
        return {
            periodo: { mes, ano },
            financeiro: {
                receita: receitaTotal.toFixed(2),
                custo: custoTotal.toFixed(2),
                lucro:lucroLiquido.toFixed(2),
                margem: margem + "%"
            },
            kpis: {
                totalVendas: vendas.length,
                totalItens: totalBolos,
                ticketMedio: ticketMedio
            }
        };

    }
};

module.exports = BalancoService;