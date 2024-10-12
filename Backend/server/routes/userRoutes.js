import express from 'express';
import { registrar, obtenerPerfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } from '../../controllers/userController.js';
import CheckAuth from '../../middlewares/authMiddleware.js';


const router = express.Router();

//Area Publica
router.post('', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);

router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);


//Area Privada
router.get('/perfil', CheckAuth, obtenerPerfil);

export default router;

