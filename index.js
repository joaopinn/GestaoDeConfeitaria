import express from 'express';
import { connectDB } from "./src/database.js";
import relatorioRoutes from './src/routes/RelatorioRoutes.js';

const port = 3000;
const app = express();

app.use(express.json());

app.get( '/', (req, res)=> {
    res.send("Conexão com o servidor realizada")
});

// Rotas
app.use('/relatorios', relatorioRoutes);

connectDB();

app.listen(port, ()=> {[
    console.log("Servidor rodando")
]});