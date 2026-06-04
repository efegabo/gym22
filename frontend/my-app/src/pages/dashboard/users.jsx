import ButtonLogout from "../../components/buttonLogout";
import UserForm from "../../components/user/userForm";
 import {getPlanes} from "../../services/planesServices";
import { useEffect, useState } from "react";
const Users = () => {
    const [planes, setPlanes] = useState([]);

    useEffect(() => {
        const fetchPlanes = async () => {
            try {
                const cargarPlanes = await getPlanes();
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
              <ButtonLogout />
            <h1>Usuarios</h1>
            <UserForm planes={planes} />
           
        </div>
    );
}
export default Users;