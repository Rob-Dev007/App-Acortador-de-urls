import express from 'express';
import CheckAuth from '../../middlewares/authMiddleware.js';
import { agregarUrl, obtenerUrls, obtenerUrl, actualizarUrl, eliminarUrl } from '../../controllers/urlController.js';

const router = express.Router();

router
    .route('/')
    .post(CheckAuth, agregarUrl)
    .get(CheckAuth, obtenerUrls);

router
    .route('/:id')
    .get(CheckAuth, obtenerUrl)
    .put(CheckAuth, actualizarUrl)
    .delete(CheckAuth, eliminarUrl)

export default router;