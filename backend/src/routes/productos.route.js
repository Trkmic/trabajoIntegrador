import { Router } from "express";
import productoController from "../controllers/productos.controllers.js";

const router = Router();

router.get("/", productoController.getAllProductos);
router.put("/estado/:id", productoController.cambiarEstadoProducto);
router.put("/:id", productoController.actualizarProducto);
router.post("/", productoController.crearProducto);

export default router;