// models/Insumo.js
const mongoose = require("mongoose");

const InsumoSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  unidade: { type: String, required: true, enum: ['kg', 'g', 'l', 'ml', 'un'] }, // ex: 'kg', 'un', 'litro'
  // Dados para cálculo de custo
  precoCusto: { type: Number, default: 0 },
  tamanhoEmbalagem: { type: Number, required: true },

  estoqueAtual: { type: Number, default: 0 },
  estoqueMinimo: { type: Number, default: 5 }, // Para avisar quando acabar
  
  status: { type: String, enum: ['ATIVO', 'INATIVO'], default: 'ATIVO' }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });


InsumoSchema.virtual('custoPorUnidadeBase').get(function() {
  if (!this.tamanhoEmbalagem || this.tamanhoEmbalagem === 0) return 0;
  return this.precoCusto / this.tamanhoEmbalagem;
});

module.exports = mongoose.model("Insumo", InsumoSchema);