// Middelware para verificar el token de autenticación
import jwt from 'jsonwebtoken';

 const verifyToken = (req, res, next) => {
     const token = req.cookies.access_token; // Obtener el token de las cookies
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    try {
        //verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);//verificar el token con la clave secreta
        //guardar el id del usuario en la solicitud
        console.log("Decoded token:", decoded); // Agregar este log para verificar el contenido del token decodificado
        req.id = decoded.id;
        //res.status(200).json({ message: "Token verified successfully", id: req.id, token: token }); // Enviar una respuesta de éxito con el ID del usuario y el token
        //continuar con la siguiente función
        next();
    }   
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized'});
    }
};

export default verifyToken;