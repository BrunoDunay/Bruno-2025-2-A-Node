import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
import perfilRoutes from "./src/routes/perfil.js";
import { conectarDB } from "./src/config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
conectarDB();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api", perfilRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "🔑 Servidor de autenticación JWT funcionando" });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Error interno del servidor" });
});

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
