import express from "express";
import { shortenUrlPublic, redirectPublic } from "../../controllers/urlController.js";

const router = express.Router();

// Ruta pública para usuarios no autenticados
router.post('/shorten', shortenUrlPublic);
//Redirreción url pública
router.get('/:shortUrlId', redirectPublic);

export default router;