import { Router } from "express";
import librosRoutes from "./libroRoutes.js";

const router = Router();
router.use("/libros", librosRoutes);

export default router;
