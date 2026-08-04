import Router from "express";
import verifyToken from "../../middelwares/verifyToken.js";
import { getAllClients, deleteUserCliente,cantidadClientesPorGym, cantidadTotalClientesPorgym,
     actulizarEstados,asistenciaClienteId} from "../../controllers/gestionCliente/clientController.js";
const router = Router();

router.get("/getAllClients", verifyToken, getAllClients);
router.get('/cantidadClientes/:estado', verifyToken, cantidadClientesPorGym);
 router.get("/getAllClientsNumbers", verifyToken, cantidadTotalClientesPorgym);
router.delete('/deleteUser/:id_usuario',verifyToken, deleteUserCliente )
router.put("/suscripciones/actualizar-estados", verifyToken, actulizarEstados);
router.get("/getAsistenciasId", verifyToken, asistenciaClienteId);

export default router;