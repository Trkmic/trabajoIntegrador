import { Router } from "express";
import { guardarVenta } from "../controllers/ventas.controllers.js";

const router = Router();

router.post("/", guardarVenta);

export default router;