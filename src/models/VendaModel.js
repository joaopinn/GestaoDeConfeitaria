// models/Venda.js
const mongoose = require("mongoose");

const VendaSchema = new mongoose.Schema({
  encomenda: { type: mongoose.Schema.Types.ObjectId, ref: "Encomenda", required: true },
  quantidadeVendida: { type: Number, required: true },
  dataVenda: { type: Date, default: Date.now },

  valorTotal: { type: Number, required: true } // preçoVenda * quantidade
}, { timestamps: true });

module.exports = mongoose.model("Venda", VendaSchema);
