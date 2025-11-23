// models/Relatorio.js
const mongoose = require('mongoose');

const RelatorioSchema = new mongoose.Schema({
  dataInicio: {
    type: Date,
    required: true
  },
  dataFim: {
    type: Date,
    required: true
  },

  // Campos opcionais caso você queira salvar o resultado do cálculo
  resumoFinanceiro: {
    receitaTotal: Number,
    custoProducao: Number,
    lucroLiquido: Number,
    margemMedia: Number
  },

  metricas: {
    totalEncomendas: Number,
    ticketMedio: Number
  },

  // Campos opcionais — apenas se você quiser armazenar
  topProdutos: [
    {
      produtoId: mongoose.Schema.Types.ObjectId,
      nome: String,
      quantidadeVendida: Number,
      receitaGerada: Number
    }
  ],

  geradoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Relatorio', RelatorioSchema);
