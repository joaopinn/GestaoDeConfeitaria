// models/BalancoMensal.js
const mongoose = require("mongoose");

const BalancoMensalSchema = new mongoose.Schema({
  ano: { type: Number, required: true },
  mes: { type: Number, required: true }, // 1 a 12

  totalVendas: { type: Number, required: true }, // soma R$
  quantidadeVendida: { type: Number, required: true }, // total itens vendidos
  custoTotalInsumos: { type: Number, required: true }, // quanto foi gasto em insumos
  lucro: { type: Number, required: true } // totalVendas - custoTotalInsumos
}, { timestamps: true });

module.exports = mongoose.model("BalancoMensal", BalancoMensalSchema);
