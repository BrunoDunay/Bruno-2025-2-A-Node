import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a MySQL exitosa");
  } catch (error) {
    console.error("❌ Error al conectar con MySQL:", error.message);
  }
};

export { sequelize, connectDB };
