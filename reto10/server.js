import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";
import registroRoutes from "./src/routes/registro.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// conectar BD
connectDB();

// Middlewares
app.use(express.json());

// Rutas
app.use("/api", registroRoutes);

// Middleware de errores
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
