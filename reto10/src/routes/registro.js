import express from "express";
import { body } from "express-validator";
import { registrarUsuario } from "../controllers/registroController.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = express.Router();

const validacionesRegistro = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/).withMessage("El nombre solo puede contener letras y espacios"),

  body("correo")
    .isEmail().withMessage("Debe ser un correo válido")
    .normalizeEmail(),

  body("edad")
    .isInt({ min: 18, max: 99 }).withMessage("La edad debe ser un número entre 18 y 99"),

  body("contraseña")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

// POST /api/registro
router.post("/registro", validacionesRegistro, validarCampos, registrarUsuario);

export default router;
