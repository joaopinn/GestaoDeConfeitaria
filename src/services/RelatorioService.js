const mongoose = require('mongoose');

const RelatorioModel = require('../models/RelatórioModel');
const Encomenda = require('../models/EncomendaModel');
const Produto = require('../models/CatalogoModel'); 


const MovimentacaoEstoque = null;


const parseRange = (inicio, fim) => {
  // Se não vier data, pega do dia 01 até hoje
  const hoje = new Date();
  const diaPrimeiro = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

  return {
    dataInicio: inicio ? new Date(inicio) : diaPrimeiro,
    dataFim: fim ? new Date(fim) : hoje
  };
};

async function gerarRelatorio({ tipo, inicio, fim, salvar = false }) {
  // valida e normaliza intervalo
  const { dataInicio, dataFim } = parseRange(inicio, fim);

  // roteamento interno por tipo
  if (tipo === 'vendas') {
    const resultado = await gerarRelatorioVendas({ dataInicio, dataFim });
    if (salvar && RelatorioModel) await salvarHistorico({ dataInicio, dataFim, resultado });
    return resultado;
  }

  if (tipo === 'produtos') {
    const resultado = await gerarRelatorioProdutos({ dataInicio, dataFim });
    if (salvar && RelatorioModel) await salvarHistorico({ dataInicio, dataFim, resultado });
    return resultado;
  }

  if (tipo === 'estoque') {
    const resultado = await gerarRelatorioEstoque({ dataInicio, dataFim });
    if (salvar && RelatorioModel) await salvarHistorico({ dataInicio, dataFim, resultado });
    return resultado;
  }

  throw new Error('Tipo inválido. Use "vendas", "produtos" ou "estoque".');
}

/* ---------------------------
   Implementações por tipo
   --------------------------- */

async function gerarRelatorioVendas({ dataInicio, dataFim }) {
  // 1) total e contagem de encomendas (exclui CANCELADA)
  const matchEncomendas = {
    createdAt: { $gte: dataInicio, $lte: dataFim },
    status: { $ne: 'CANCELADA' } // Verifica se seu Enum é MAIÚSCULO mesmo
  };

  const [resumo] = await Encomenda.aggregate([
    { $match: matchEncomendas },
    {
      $group: {
        _id: null,
        receitaTotal: { $sum: "$valorTotal" },
        totalEncomendas: { $sum: 1 }
      }
    }
  ]);

  const receitaTotal = resumo ? resumo.receitaTotal : 0;
  const totalEncomendas = resumo ? resumo.totalEncomendas : 0;
  const ticketMedio = totalEncomendas ? (receitaTotal / totalEncomendas) : 0;

  // 2) top produtos (desmonta itens de encomenda)
  const topProdutos = await Encomenda.aggregate([
    { $match: matchEncomendas },
    { $unwind: "$itens" },
    {
      $group: {
        _id: "$itens.produto",
        quantidadeVendida: { $sum: "$itens.quantidade" },
        // Usa o preço salvo na hora da venda (snapshot)
        receitaGerada: { $sum: { $multiply: ["$itens.quantidade", "$itens.precoUnitarioSnapshot"] } }
      }
    },
    {
      $lookup: {

        from: "catalogos",
        localField: "_id",
        foreignField: "_id",
        as: "produtoInfo"
      }
    },
    { $unwind: { path: "$produtoInfo", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        produtoId: "$_id",
        nome: { $ifNull: ["$produtoInfo.nome", "Produto removido"] },
        quantidadeVendida: 1,
        receitaGerada: 1
      }
    },
    { $sort: { receitaGerada: -1 } },
    { $limit: 10 }
  ]);

  return {
    periodo: { dataInicio, dataFim },
    tipo: "vendas",
    resumoFinanceiro: { receitaTotal, custoProducao: 0, lucroLiquido: 0, margemMedia: 0 },
    metricas: { totalEncomendas, ticketMedio },
    topProdutos
  };
}

async function gerarRelatorioProdutos({ dataInicio, dataFim }) {
  // Produtos criados ou atualizados no período
  const produtos = await Produto.find({
    $or: [
      { createdAt: { $gte: dataInicio, $lte: dataFim } },
      { updatedAt: { $gte: dataInicio, $lte: dataFim } }
    ]
  }).select("nome categoria precoVenda custoProducao createdAt updatedAt").lean();

  const listaProdutos = produtos.map(p => {
    // Proteção contra divisão por zero
    const margem = (p.precoVenda && p.custoProducao) ? ((p.precoVenda - p.custoProducao) / p.precoVenda) * 100 : 0;

    return {
      produtoId: p._id,
      nome: p.nome,
      categoria: p.categoria,
      precoVenda: p.precoVenda,
      custoProducao: p.custoProducao,
      margemLucro: margem.toFixed(2),
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    };
  });

  return {
    periodo: { dataInicio, dataFim },
    tipo: "produtos",
    produtos: listaProdutos,
    totalProdutos: listaProdutos.length
  };
}

async function gerarRelatorioEstoque({ dataInicio, dataFim }) {
  const matchEncomendas = {
    createdAt: { $gte: dataInicio, $lte: dataFim },
    status: { $ne: 'CANCELADA' }
  };

  const saidasPorProduto = await Encomenda.aggregate([
    { $match: matchEncomendas },
    { $unwind: "$itens" },
    {
      $group: {
        _id: "$itens.produto",
        quantidadeSaida: { $sum: "$itens.quantidade" }
      }
    },
    {
      $lookup: {
        from: "catalogos",
        localField: "_id",
        foreignField: "_id",
        as: "produtoInfo"
      }
    },
    { $unwind: { path: "$produtoInfo", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        produtoId: "$_id",
        nome: { $ifNull: ["$produtoInfo.nome", "Produto removido"] },
        quantidadeSaida: 1
      }
    },
    { $sort: { quantidadeSaida: -1 } }
  ]);


  let movimentacoes = [];
  if (MovimentacaoEstoque) {
    try {
      movimentacoes = await MovimentacaoEstoque.find({
        dataMovimentacao: { $gte: dataInicio, $lte: dataFim }
      }).select("tipo produto quantidade createdAt descricao").lean();
    } catch (e) { console.log("Erro ao buscar movimentações"); }
  }

  return {
    periodo: { dataInicio, dataFim },
    tipo: "estoque",
    saidasPorProduto,
    movimentacoes: movimentacoes
  };
}

/* ---------------------------
   Função de salvar histórico
   --------------------------- */
async function salvarHistorico({ dataInicio, dataFim, resultado }) {
  if (!RelatorioModel) return;
  try {
    const doc = new RelatorioModel({
      dataInicio,
      dataFim,
      resumoFinanceiro: resultado.resumoFinanceiro || undefined,
      metricas: resultado.metricas || undefined,
      topProdutos: resultado.topProdutos || undefined
    });
    await doc.save();
    return doc;
  } catch (err) {
    console.warn('Falha ao salvar relatório histórico:', err.message);
    return null;
  }
}

module.exports = {
  gerarRelatorio
};