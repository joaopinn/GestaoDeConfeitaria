const mongoose = require('mongoose');

const RelatorioMensalSchema = new mongoose.Schema({
  // Identificação do Período (Ex: Novembro 2025)
  mes: { type: Number, required: true }, // 11
  ano: { type: Number, required: true }, // 2025
  
  // Cards Principais (Baseado na imagem image_b12108.png)
  resumoFinanceiro: {
    receitaTotal: { type: Number, default: 0 },    // R$ 8450.00
    custoProducao: { type: Number, default: 0 },   // R$ 3200.00
    lucroLiquido: { type: Number, default: 0 },    // R$ 5250.00
    margemMedia: { type: Number, default: 0 }      // 62.1%
  },

  // Métricas Operacionais
  totalEncomendas: { type: Number, default: 0 },   // 35 (42 no total)
  ticketMedio: { type: Number, default: 0 },       // R$ 201.19 (image_b120a5.png)
  
  // Análise de Performance / Top Produtos (Baseado na imagem image_b1240e.png)
  topProdutos: [{
    produto: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Produto' 
    },
    nomeSnapshot: String,        // Guarda o nome caso o produto seja apagado depois
    quantidadeVendida: Number,   // Ex: 18 vendas
    receitaGerada: Number        // Ex: R$ 2160.00
  }],

  // Controle de Atualização
  ultimaAtualizacao: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['ABERTO', 'FECHADO'], // 'ABERTO' recalcula ao entrar, 'FECHADO' é histórico estático
    default: 'ABERTO' 
  }
}, {
  timestamps: true
});

// Índice composto para garantir que só existe um relatório por mês/ano
RelatorioMensalSchema.index({ mes: 1, ano: 1 }, { unique: true });

module.exports = mongoose.model('RelatorioMensal', RelatorioMensalSchema);