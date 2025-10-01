import express from 'express';
import CheckAuth from '../../middlewares/authMiddleware.js';
import { agregarUrl, obtenerUrl, actualizarUrl, eliminarUrl, incrementarClicks, pagination } from '../../controllers/urlController.js';

const router = express.Router();

router
    .route('/')
    .post(CheckAuth, agregarUrl)
    .get(CheckAuth,  pagination)

router
    .route('/:id')
    .get(CheckAuth, obtenerUrl)
    .put(CheckAuth, actualizarUrl)
    .delete(CheckAuth, eliminarUrl)

router.get('/clicks/:customUrl', CheckAuth, incrementarClicks);



export default router;