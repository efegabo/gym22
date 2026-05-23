import Router from "express";
import { registerUser, loginUser} from "../controllers/authController.js";

const router = Router();

// Ruta para registrar un nuevo usuario
router.post("/register", registerUser);
 router.post("/login", loginUser, (req, res) => {
    res.status(200).json({ message: "Login successful" });
});
export default router;