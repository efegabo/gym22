import Router from 'express';
import {obtenerQrUseController, obtenerQrClienteID} from '../../controllers/gestionCliente/getQrUser.js';
import {registrarAsistencias} from '../../controllers/gestionCliente/clientController.js';
import verifyToken from '../../middelwares/verifyToken.js'
const router = Router();
//router.get('/qr/:id_usuario', obtenerQrUseController);
router.get('/qr/:id_usuario', verifyToken,  obtenerQrClienteID);
router.post('/registrar', verifyToken, registrarAsistencias);

export default router;