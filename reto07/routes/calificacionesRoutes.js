import express from "express";
import { obtenerCalificaciones } from "../controllers/calificacionesController.js";

const router = express.Router();


router.get("/", obtenerCalificaciones);

export default router;
