import { Router } from "express";
import librosRoutes from "./librosRoutes.js";

const router = Router();

router.use("/libros", librosRoutes);

export default router;
