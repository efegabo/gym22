 import Navbar from '../../components/mobile/navbar'
 import { Box } from "@mui/material";
 import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
 import dayjs from "dayjs";
import { useState, useEffect } from "react";
import {asistenciaIdCliente} from '../../services/gestionUser/getCliente'
import './../../components/mobile/calendar.css'
 const estadisticasClinte =()=>{
     const [asistencia, setAsistencia] = useState([]);
      const [value, setValue] = useState(new Date());
     useEffect(() => {
             const fetchAsistencia = async () => {
                 try {
                     const asistencia = await asistenciaIdCliente();
                    
                     setAsistencia(asistencia.asistenciaiD);
                      
                 }   
                 catch (error) {
                     console.error("Error al obtener las últimas asistencias:", error);
                 }
             };
             fetchAsistencia();
         }, []);
         console.log(asistencia[0]);
          
     return (
        <div>
            <Calendar
                tileClassName={({ date }) => {
                    const existe = asistencia.some((item) => {

                        const fechaAsistencia = new Date(
                            item.fecha_Asistencia
                        );

                        return (

                            fechaAsistencia.getFullYear() === date.getFullYear()
                            &&
                            fechaAsistencia.getMonth() === date.getMonth()
                            &&
                            fechaAsistencia.getDate() === date.getDate()
                        );
                    });
                    return existe ? "dia-asistido" : null;
                }}
            />
            <Box>
                        <Navbar />
                </Box>
        </div>

    );

}
export default estadisticasClinte