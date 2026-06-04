import Router from 'express';
import { createPlan, getAllPlanes } from '../controllers/planController.js';
import verifyToken from "../middelwares/verifyToken.js";
const router = Router();
router.post('/create', verifyToken, createPlan);
router.get('/all/plan', verifyToken, getAllPlanes);
export default router;