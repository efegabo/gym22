 import generateQrCode from "../../services/qrGenerator.js";
 import { obtenerQrporUsuario } from "../../querys/gestionUsers.js";

 export const obtenerQrUseController = async (req, res) => {
     console.log("PARAMS:", req.params);
    console.log("ID:", req.params.id_usuario);
    try {
        const { id_usuario } = req.params;
        console.log("ID del usuario recibido:", id_usuario); // Verificar que se recibe el ID del usuario

        const codigoQr = await obtenerQrporUsuario(id_usuario);
        const imagenQr = await generateQrCode(codigoQr);

        res.status(200).json({ qrCode: imagenQr });
    } catch (error) {
        console.error("Error al obtener el código QR del usuario:", error);
        res.status(500).json({ message: "Error al obtener el código QR del usuario" });
    }
};
    