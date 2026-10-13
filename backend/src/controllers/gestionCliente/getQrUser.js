 import generateQrCode from "../../services/qrGenerator.js";
 import { obtenerQrporUsuario } from "../../querys/gestionUsers.js";
 import { obtenerInformacionCliente } from "../../querys/qrGestion.js";

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
    
 export const obtenerQrClienteID = async (req, res) => {
  
    try {
        const  id_usuario = req.id;
        console.log("ID del usuario recibido:", id_usuario); // Verificar que se recibe el ID del usuario

        const codigoQr = await obtenerQrporUsuario(id_usuario);
        const imagenQr = await generateQrCode(codigoQr);

        res.status(200).json({ qrCode: imagenQr });
    } catch (error) {
        console.error("Error al obtener el código QR del usuario:", error);
        res.status(500).json({ message: "Error al obtener el código QR del usuario" });
    }
};

export const datosClienteQr = async()=>{
     try{
        
     }catch(error){
        console.error("Error al obtener los datos del cliente:", error);
        res.status(500).json({ message: "Error al obtener los datos del cliente" });
     }
}

export const obtenerInformacionClienteController = async (req, res) => {
    try {
        const { uidd } = req.params;
        console.log("UIDD recibido:", uidd); // Verificar que se recibe el UIDD
        const informacionCliente = await obtenerInformacionCliente(uidd);
        res.status(200).json(informacionCliente);
        } catch (error) {
            console.error("Error al obtener los datos del cliente:", error);
        res.status(500).json({ message: "Error al obtener los datos del cliente" });
    }
}