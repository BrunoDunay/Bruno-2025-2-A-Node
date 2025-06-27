import express from 'express';
import { logger } from './src/middlewares/logger.js';
import { loadData } from './src/storage.js';
import usersRouter from './src/routes/usersRoutes.js';

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
  res.end('Hola');
});

app.use('/api', usersRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});