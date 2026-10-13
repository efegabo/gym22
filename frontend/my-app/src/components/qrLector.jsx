import { useState } from "react";
import { useRef } from "react";
import { useZxing } from "react-zxing";
import { registrarAsistencia } from "../services/gestionUser/getCliente.js"
import {informacionClienteQr} from "../services/gestionUser/qrClient.js"
import { Box, Grid, Typography } from "@mui/material";
export const BarcodeScanner = () => {
  const [cliente, setCliente] = useState("No hay datos escaneados");
  const bloqueado = useRef(false);
  const asistenciaRegistrada = async (uidd) => {
    try {
      const response = await registrarAsistencia(uidd);
      console.log("Asistencia registrada:", response);
    } catch (error) {
      console.error("Error al registrar la asistencia:", error);
    }
  };
  const obtenerInformacionCliente = async (uidd) => {
    try {
      const informacion = await informacionClienteQr(uidd);
      setCliente(informacion);
      console.log("Información del cliente:", informacion);
    } catch (error) {
      console.error("Error al obtener la información del cliente:", error);
    }
  };
  const { ref } = useZxing({
    onDecodeResult(result) {
      // Evita procesar múltiples resultados en un corto período de tiempo
      //current es un objeto mutable que persiste durante todo el ciclo de vida del componente, por lo que podemos usarlo para almacenar el estado de bloqueo
      if (bloqueado.current) return;
      // Bloquea la lectura durante 3 segundos
      bloqueado.current = true;
      console.log("leyendo...")
      const uidd = result.rawValue;
      asistenciaRegistrada(uidd);
      obtenerInformacionCliente(uidd);
      setTimeout(() => {
        bloqueado.current = false;
      }, 3000); // Espera 3 segundos
    },
  });

  return (
    <>
      <Grid container sx={{ p: 3 }} >
        <Typography variant="h6" sx={{ pb: 2 }} >
          Escanea el Qr de tus clientes aquí.
        </Typography>
        <Typography variant="body2" sx={{ pb: 2 }}  >
          Recuerda que para poder escanear el Qr de tus clientes debes tener la cámara de tu dispositivo habilitada.
        </Typography>

        <Grid container spacing={2} sx={{ backgroundColor: "lightgray", p:1, width: "100%" }} >
          <Grid size={{ xs: 12, md: 6 }}>
            <video ref={ref} muted playsInline style={{
              width: "100%",
              height: "150px",
              background: "black",
            }} />

          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ pt: 1, fontWeight: "bold" }} >
              Qr escaneado:
            </Typography>
             {cliente && (
              <> 
              <Box sx={{display:"flex"}}>
                <Typography variant="body2" sx={{ pt: 1, fontWeight: "bold" }} >
                Nombre del cliente: 
               </Typography>
                <Typography variant="body2" sx={{ pt: 1}} >
                 {cliente.nombre_Usuario} {cliente.apellido}
               </Typography>
              </Box>
                
                <Box sx={{display:"flex"}}>
                <Typography variant="body2" sx={{ pt: 1, fontWeight: "bold" }} >
                Estado de la suscripción:
                </Typography>
                 <Typography variant="body2" sx={{ pt: 1}} >
                 {cliente.estado}  
               </Typography>
              </Box>
              <Box sx={{display:"flex"}}>
                <Typography variant="body2" sx={{ pt: 1 , fontWeight: "bold" }} >
                Plan del cliente:
                </Typography>
                 
               <Typography variant="body2" sx={{ pt: 1}} >
                 { cliente.nombre_Plan}  
               </Typography>
              </Box>
              <Box sx={{display:"flex"}}>
                <Typography variant="body2" sx={{ pt: 1, fontWeight: "bold" }} >
                Fecha de vencimiento de la suscripción:
                </Typography>
               <Typography variant="body2" sx={{ pt: 1}} >
                 {cliente.fecha_fin}  
               </Typography>
              </Box>
              </>) }
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};