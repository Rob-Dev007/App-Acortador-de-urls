import express from 'express';
import CheckAuth from '../../middlewares/authMiddleware.js';
import { agregarUrl, obtenerUrls, obtenerUrl, actualizarUrl, eliminarUrl, shortenUrlPublic, redirectPublic, searchUrl, incrementarClicks } from '../../controllers/urlController.js';

const router = express.Router();

// Ruta pública para usuarios no autenticados
router.post('/shorten', shortenUrlPublic);
router.get('/:shortUrlId', redirectPublic);

router
    .route('/')
    .post(CheckAuth, agregarUrl)
    .get(CheckAuth, obtenerUrls);

router
    .route('/:id')
    .get(CheckAuth, obtenerUrl)
    .put(CheckAuth, actualizarUrl)
    .delete(CheckAuth, eliminarUrl)

router.get('/search', CheckAuth, searchUrl);
router.get('/clicks/:customUrl', CheckAuth, incrementarClicks);

    
export default router;