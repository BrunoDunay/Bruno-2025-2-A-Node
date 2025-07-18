import express from 'express';
import { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario, obtenerUsuarioById } from '../controllers/userController.js';

const router = express.Router();

router.get('/user', obtenerUsuarios);

router.get('/user/:id', obtenerUsuarioById);

router.post('/user', crearUsuario);

router.put('/user/:id', actualizarUsuario);

router.delete('/user/:id', eliminarUsuario);

export default router;