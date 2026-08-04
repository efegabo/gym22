import { getUserByEmail } from "../../querys/auth.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
export const loginCliente =async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user= await getUserByEmail(email)
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordvalid = await bcrypt.compare(password, user.passwordd)
        if (!isPasswordvalid) {
        return res.status(401).json({ message: "Invalid password" });
         }
         const generateToken = jsonwebtoken.sign(
         {id:user.id_usuario, email: user.email }, process.env.JWT_SECRET,
          { expiresIn: "1h" }
         )
         
         return res.cookie('access_token', generateToken, {
                  httpOnly: true,
                     secure: process.env.NODE_ENV === 'production',
                         sameSite: 'strict',
                         
         }).status(200).json({
            message:'Login succeful cliente'
         })
          
    }catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
}