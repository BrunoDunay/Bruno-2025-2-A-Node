import express from "express";
import {
  paresImpares,
  validarNumeros,
} from "./utils/paresImpares.js";

const app = express();
const PORT = 3000;

app.get("/filtrar", (req, res) => {
  const numerosStr = req.query.numeros;  // Ejemplo: ?numeros=2,5,8,9,10

  if (!numerosStr) {
    return res.status(400).send("Debes proporcionar el parámetro 'numeros' en la URL.");
  }

  const numerosArray = numerosStr.split(',').map(Number);

  if (!validarNumeros(numerosArray)) {
    return res.status(400).send("Todos los valores deben ser números válidos.");
  }

  const resultado = paresImpares(numerosArray);

  res.status(200).json({
    pares: resultado.pares,
    impares: resultado.impares
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
