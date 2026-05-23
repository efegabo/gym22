import { register, getUserByEmail } from "../querys/auth.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
 import cookies from "cookie-parser";
 

export const registerUser = async (req, res) => {
    try {
        const { nombre_gym, name, email, password } = req.body;
        const rol = 'admin'; // Asignar un rol predeterminado
        const estado = 'activo'; // Asignar un estado predeterminado
        const user = await register(nombre_gym, name, email, password, rol, estado);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) { 
         res.status(500).json({ message: "Error registering user", error: error.message });
    }
}

export const loginUser = async (req, res) => {
    console.log("entro al loginUser");
    //  lógica de inicio de sesión 
    //verificar si el usuario existe
    try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    //verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.passwordd);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }
    //generar un token JWT
    const token = jsonwebtoken.sign(
        { id: user.id, email: user.email },
         process.env.JWT_SECRET,
          { expiresIn: "1h" });
          // Enviar el token como una cookie segura
    return res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    }).status(200).json({ // Enviar información adicional del usuario junto con el token
        message: "Login successful",
        id: user.id,
        nombre: user.nombre,
        email: user.email,        
        rol: user.rol, 
        estado: user.estado,
        id_gym: user.id_gym

    }
    );
     }catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }

}