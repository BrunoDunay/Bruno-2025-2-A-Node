import express from 'express';
import { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea, obtenerTareaById } from '../controllers/taskController.js';

const router = express.Router();

router.get('/task', obtenerTareas);

router.get('/task/user/:userId', obtenerTareasUsuario);

router.get('/task/:id', obtenerTareaById);

router.post('/task', crearTarea);

router.put('/task/:id', actualizarTarea);

router.delete('/task/:id', eliminarTarea);

export default router;