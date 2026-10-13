 import Input from "../../components/Input";
 import Button from "../../components/button";
 import FormularioPlanes from "../../components/planes/formGestion";
 import GetPlanes from "../../components/planes/getPlanes";
  import {getPlanes} from "../../services/planesServices";
 import { useEffect, useState } from "react";
const planes = () => {
    const [planes, setPlanes] = useState([]);
   useEffect(() => {
    const fetchPlanes = async () => {
        try{
            const cargarPlanes = await getPlanes();
            console.log("Planes obtenidos:", cargarPlanes);
            setPlanes(cargarPlanes);
        }

        catch (error) {
            console.error("Error al obtener los planes:", error);
        }
    };
    fetchPlanes();
  }, []);
    return (
        <div>
             < FormularioPlanes />
              <GetPlanes getPlan={planes} />
        </div>
    );
}
export default planes;