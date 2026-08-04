import { useState } from "react";
import { useRef } from "react";
import { useZxing } from "react-zxing";
import {registrarAsistencia} from "../services/gestionUser/getCliente.js"
export const BarcodeScanner = () => {
  const [result, setResult] = useState("");
   const bloqueado = useRef(false);
  const asistenciaRegistrada = async (uidd) => {
        try {
            const response = await registrarAsistencia(uidd);
            console.log("Asistencia registrada:", response);
        } catch (error) {
            console.error("Error al registrar la asistencia:", error);
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
      setResult(result.rawValue);
      asistenciaRegistrada(result.rawValue);
      setTimeout(() => {
        bloqueado.current = false;
      }, 3000); // Espera 3 segundos
    },
  });

  return (
    <>
      <video ref={ref} muted playsInline  style={{
    width: "100%",
    height: "400px",
    background: "black",
  }}/>
      <p>
        <span>Last result: </span>
        <span>{result}</span>
      </p>
    </>
  );
};