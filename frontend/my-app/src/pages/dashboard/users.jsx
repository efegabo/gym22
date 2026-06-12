import ButtonLogout from "../../components/buttonLogout";
import UserForm from "../../components/user/userForm";
 import {getPlanes} from "../../services/planesServices";
 import {Avatar, Container} from "@mui/material";
  
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
            <Avatar src="/public/avatar.png" />
            
                 <UserForm planes={planes} />
       
            
        </div>
    );
}
export default Users;