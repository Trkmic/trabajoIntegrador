import { Router } from "express";
import productoController from "../controllers/productos.controllers.js";

const router = Router();

router.get("/", productoController.getAllProductos);
router.patch("/:id", productoController.cambiarEstadoProducto);

export default router;