import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // carrega as variáveis do .env

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🔥 Conectado ao MongoDB Atlas!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error.message);
  }
}