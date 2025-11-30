const express = require('express');
const cors = require('cors');
const { connectDB } = require("./src/database.js");

// Importando rotas
const relatorioRoutes = require("./src/routes/RelatorioRoutes.js");
const insumoRoutes = require('./src/routes/InsumoRoutes.js');
const catalogoRoutes = require("./src/routes/CatalogoRoutes.js");
const encomendaRoutes = require("./src/routes/EncomendaRoutes.js");
const balancoRoutes = require('./src/routes/BalancoRoutes');

const port = 3000;
const app = express();



// Configurações
app.use(cors({
    origin: '*', // Permite qualquer site acessar (mais fácil para desenvolvimento)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rota teste
app.get( '/', (req, res)=> {
    res.send("\u{2705} Conexão com o servidor realizada")
});

// Rotas
app.use('/api/relatorios', relatorioRoutes);
app.use('/api/insumos', insumoRoutes);
app.use('/api/catalogo', catalogoRoutes);
app.use('/api/encomenda', encomendaRoutes);
app.use('/api/balanco', balancoRoutes);

connectDB();

app.listen(port, ()=> {[
    console.log(`\u{1F525} Servidor rodando na porta ${port}`)
]});