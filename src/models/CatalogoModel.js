const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  categoria: { type: String, required: true },
  descricao: String,
  
  precoVenda: { type: Number, required: true },
  tempoPreparo: { type: Number, required: true },
  
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
    }
  }],
  
  custoProducao: { type: Number, default: 0 },

  status: { 
    type: String, 
    enum: ['ATIVO', 'INATIVO'], 
    default: 'ATIVO' 
  }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Método de calculo de Custo automático 
ProdutoSchema.methods.calcularCusto = async function () {
  // Vai no banco e pega os dados completos dos insumos
  await this.populate('receita.insumo');

  let custoTotal = 0;

  // faz o loop somando os custos
  this.receita.forEach(item => {
    if (item.insumo) {
      const insumo = item.insumo;

      // Tenta usar o virtual do insumo
      let custoPorUnidade = insumo.custoPorUnidadeBase;
      
      // Fallback de segurança: (Preço / Tamanho)
      if(!custoPorUnidade) {
        custoPorUnidade = insumo.precoCusto / insumo.tamanhoEmbalagem;
      }

      custoTotal += (custoPorUnidade * item.quantidade);
    }
  });

  this.custoProducao = parseFloat(custoTotal.toFixed(2));

  return this.save(); 
}


// Virtual: Calcula a margem automaticamente
ProdutoSchema.virtual('margemLucro').get(function() {
  if (!this.precoVenda || !this.custoProducao) return 0;
  return ((this.precoVenda - this.custoProducao) / this.precoVenda) * 100;
});

module.exports = mongoose.model('Produto', ProdutoSchema);