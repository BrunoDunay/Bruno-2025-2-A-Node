import express from "express";
import { obtenerPerfil } from "../controllers/perfilController.js";
import { verificarToken } from "../middlewares/verificartoken.js";

const router = express.Router();

router.get("/perfil", verificarToken, obtenerPerfil);

export default router;
