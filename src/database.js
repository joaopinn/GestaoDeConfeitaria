const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // carrega as variáveis do .env

async function connectDB() {
  try {
    // Tenta conectar usando a string que está no .env
    // Se não tiver string, tenta conectar localmente como fallback (segurança)
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/confeitaria";
    
    await mongoose.connect(uri);

    console.log("\u{1F525} Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("\u{274C} Erro ao conectar ao MongoDB:", error.message);
    process.exit(1); // Encerra o processo se não conseguir conectar
  }
}

module.exports = { connectDB };