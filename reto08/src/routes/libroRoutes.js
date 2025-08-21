import { Router } from "express";
import {
  obtenerLibros,
  obtenerLibroPorId,
  crearLibro,
  actualizarLibro,
  eliminarLibro,
} from "../controllers/libroController.js";

const router = Router();

router.get("/", obtenerLibros);
router.get("/:id", obtenerLibroPorId);
router.post("/", crearLibro);
router.put("/:id", actualizarLibro);
router.delete("/:id", eliminarLibro);

export default router;
