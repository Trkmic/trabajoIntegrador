import { Router } from "express";
import { guardarVenta, getVentas } from "../controllers/ventas.controllers.js";

const router = Router();

router.post("/", guardarVenta);
router.get("/", getVentas);

export default router;