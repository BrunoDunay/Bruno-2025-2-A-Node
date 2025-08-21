import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import routes from "./src/routes/index.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/", routes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
