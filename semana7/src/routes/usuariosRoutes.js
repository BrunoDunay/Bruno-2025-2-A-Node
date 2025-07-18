const express = require('express');
const router = express.Router();
const { actualizarUsuario, crearUsuario, eliminarUsuario, obtenerUsuario, obtenerUsuarios, obtenerUsuariosMunicipio } = require('../controllers/usuarioController');

router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuario);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);
router.get('/municipio/:id', obtenerUsuariosMunicipio);

module.exports = router;
