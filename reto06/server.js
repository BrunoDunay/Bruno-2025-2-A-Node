import express from "express";
import { contarPropiedades, listarPropiedades } from "./controllers/contar.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/contar", (req, res) => {
  const objeto = req.body;
  const detallado = req.query.detallado === "true"; 

  if (!objeto || typeof objeto !== "object" || Array.isArray(objeto)) {
    return res.status(400).json({ error: "Debe enviar un objeto JSON válido" });
  }

  const cantidadPropiedades = contarPropiedades(objeto);


  const respuesta = { propiedades: cantidadPropiedades };

  
  if (detallado) {
    respuesta.detalles = listarPropiedades(objeto);
  }

  res.json(respuesta);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
