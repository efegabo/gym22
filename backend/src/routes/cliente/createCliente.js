import Router from "express";
import { createClient } from "../../controllers/gestionCliente/clientController.js";
import verifyToken from "../../middelwares/verifyToken.js";
const router = Router();
router.post("/createCliente", verifyToken, createClient);
export default router;