const mongoose = require('mongoose');

const EncomendaSchema = new mongoose.Schema({
  codigo: { type: Number, unique: true }, // Para gerar o #001, #002 (pode usar auto-increment)
  
  cliente: {
    nome: { type: String, required: true },
    telefone: { type: String, required: true }
  },
  
  dataEntrega: { type: Date, required: true }, // Guarda data e hora juntos
  
  itens: [{
    produto: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Produto',
      required: true
    },
    quantidade: { type: Number, default: 1, required: true },
    precoUnitarioSnapshot: Number // Boa prática: salvar o preço no momento da venda
  }],
  
  valorTotal: { type: Number, required: true },
  
  status: {
    type: String,
    enum: ['PENDENTE', 'EM_PRODUCAO', 'PRONTA', 'ENTREGUE', 'CANCELADA'],
    default: 'PENDENTE'
  },
  
  observacoes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Encomenda', EncomendaSchema);
