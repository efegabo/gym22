import Router from "express";
import verifyToken from "../../middelwares/verifyToken.js";
import { getAllClients } from "../../controllers/gestionCliente/clientController.js";
const router = Router();

router.get("/getAllClients", verifyToken, getAllClients);

export default router;