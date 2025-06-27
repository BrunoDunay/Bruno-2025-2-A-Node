import express from 'express';
import { logger } from './src/middlewares/logger.js';
import { loadData } from './src/storage.js';
import usersRouter from './src/routes/userRoutes.js';

const PORT = 3000;
await loadData();

const app = express();

app.use(express.json());

app.get('/:name', logger, (req, res) => {
  //http://localhost:3000/Rodrigo?isAdmin=true
  if (req.query.isAdmin === 'true') {
    res.end(`Welcome Admin ${req.params.name} to your API`);
  }
  else {
    res.end(`Welcome ${req.params.name}`);
  }
});

app.use('/api', usersRouter);
//app.use('/api', productsRouter);

app.get('/saludo/:name', logger, (req, res) => {
  const name = req.params.name;
  res.json({
    message: `Hola ${name}, bienvenido a nuestra API!`
  });
});

app.get('/api/edad', logger, (req, res) => {
  const anioNacimiento = parseInt(req.query.anioNacimiento);
  const actual = new Date().getFullYear();
  if (!anioNacimiento || anioNacimiento >= actual ) {
    return res.status(400).json({
      error: 'Año inválido'
    });    
  }
  const edad = actual - anioNacimiento;
  res.json({
    message: `Tu edad es ${edad} años`
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});