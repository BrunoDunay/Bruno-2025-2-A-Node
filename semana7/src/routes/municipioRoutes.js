const express = require('express');
const router = express.Router();

// Importar controladores
const {
  obtenerMunicipios,
  obtenerMunicipio,
  obtenerMunicipiosEstado,
  crearMunicipio,
  actualizarMunicipio,
  eliminarMunicipio
} = require('../controllers/municipioController.js');

// ===== RUTAS DE MUNICIPIOS =====

router.get('/', obtenerMunicipios);
router.get('/:id', obtenerMunicipio);
router.post('/', crearMunicipio);
router.put('/:id', actualizarMunicipio);
router.delete('/:id', eliminarMunicipio);
router.get('/estado/:id', obtenerMunicipiosEstado);

module.exports = router;