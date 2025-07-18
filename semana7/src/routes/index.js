const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuariosRoutes');
const municipioRoutes = require('./municipioRoutes');
const estadoRoutes = require('./estadoRoutes');

router.use('/usuarios', usuarioRoutes);
router.use('/municipios', municipioRoutes);
router.use('/estados', estadoRoutes);

module.exports = router;