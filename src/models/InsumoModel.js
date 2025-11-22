// models/Insumo.js
const mongoose = require("mongoose");

const InsumoSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  unidade: { type: String, required: true }, // ex: 'kg', 'un', 'litro'
  quantidadeEmEstoque: { type: Number, required: true, default: 0 },
  custoUnitario: { type: Number, required: true } // custo por unidade
}, { timestamps: true });

module.exports = mongoose.model("Insumo", InsumoSchema);
