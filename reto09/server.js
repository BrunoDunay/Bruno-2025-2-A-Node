import dotenv from "dotenv";
import express from "express";
import { sequelize } from "./src/config/database.js"; // importamos directamente sequelize
import routes from "./src/routes/index.js";

dotenv.config(); // cargar variables de entorno primero

const app = express();
app.use(express.json());

// Rutas
app.use("/", routes);

const PORT = process.env.PORT || 3000;

// Levantar servidor después de conectar a MySQL
const startServer = async () => {
  try {
    await sequelize.authenticate(); // autenticación
    console.log("✅ Conexión a MySQL exitosa");

    await sequelize.sync({ alter: true }); // crear o ajustar tablas

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar servidor:", error.message);
  }
};

startServer();
