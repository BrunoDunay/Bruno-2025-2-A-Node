import express from 'express';
import routes from './src/routes/index.js';
import { logger } from './src/middlewares/logger.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(logger);
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});