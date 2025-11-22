// models/Encomenda.js
const mongoose = require("mongoose");

const EncomendaSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  descricao: { type: String },
  precoVenda: { type: Number, required: true },

  insumosNecessarios: [
    {
      insumo: { type: mongoose.Schema.Types.ObjectId, ref: "Insumo", required: true },
      quantidade: { type: Number, required: true } // qtd usada para 1 unidade da encomenda
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Encomenda", EncomendaSchema);
