import express from 'express';
import { connectDB } from "./src/database.js";
const port = 3000;
const app = express();

app.use(express.json());

app.get( '/', (req, res)=> {
    res.send("Conexão com o servidor realizada")
});

connectDB();

app.listen(port, ()=> {[
    console.log("Servidor rodando")
]});