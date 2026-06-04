import Router from 'express';
import {obtenerQrUseController} from '../../controllers/gestionCliente/getQrUser.js';

const router = Router();
router.get('/qr/:id_usuario', obtenerQrUseController);
export default router;