import Router from "express";
import {loginCliente} from '../../src/controllers/cliente/auth.js'
import {getClientId, getUltimasAsistencias, cantidadPlanesPorGym} from  '../controllers/gestionCliente/clientController.js'
import verifyToken from "../middelwares/verifyToken.js";

const router = Router()

router.post('/loginC', loginCliente)
router.get('/user/client', verifyToken, getClientId)
router.get('/asistencias', verifyToken, getUltimasAsistencias)
router.get('/planesCantidad', verifyToken, cantidadPlanesPorGym)
export default router