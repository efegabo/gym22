import Router from "express";
import { registerUser, loginUser, logoutUser} from "../controllers/authController.js";
import verifyToken from "../middelwares/verifyToken.js";
const router = Router();

// Ruta para registrar un nuevo usuario
router.post("/register", registerUser);
router.post("/logout", logoutUser);
 router.post("/login", loginUser, (req, res) => {
    res.status(200).json({ message: "Login successful" });
});
router.get("/protected", verifyToken, (req, res) => {
    res.status(200).json(
        { message: " protected route", userId: req.userId });
}); 
export default router;