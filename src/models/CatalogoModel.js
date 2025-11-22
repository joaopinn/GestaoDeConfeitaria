const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  categoria: { type: String, required: true }, // Ex: "Bolos", "Tortas"
  descricao: String,
  
  precoVenda: { type: Number, required: true }, // O Preço (R$ 120.00)
  tempoPreparo: { type: Number, required: true }, // Em minutos (90)
  
  // A receita conecta o produto aos insumos
  receita: [{
    insumo: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Insumo',
      required: true
    },
    quantidade: { 
      type: Number, 
      required: true 
    } // Quanto gasta desse insumo (ex: 0.5 para 500g de farinha)
  }],
  
  // Opcional: Salvar o custo fixo ou calcular dinamicamente
  custoProducao: { type: Number, default: 0 } 
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual: Calcula a margem automaticamente para o front (91.0%)
ProdutoSchema.virtual('margemLucro').get(function() {
  if (!this.precoVenda || !this.custoProducao) return 0;
  return ((this.precoVenda - this.custoProducao) / this.precoVenda) * 100;
});

module.exports = mongoose.model('Produto', ProdutoSchema);