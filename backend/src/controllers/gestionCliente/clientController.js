import {createUserClient, getUsers} from "../../querys/gestionUsers.js";
export const createClient = async (req, res) => {
   try {
        const { nombre, apellido, telefono, fechaNacimiento, sexo, email, password, plan_id_gym } = req.body;
        const rol = 'cliente'; // Asignar un rol predeterminado
        const estado = 'activo'; // Asignar un estado predeterminado
        const usuarioAdmin = req.id; // Obtener el ID del usuario administrador desde el token de autenticación
        console.log("usuarioAdmin:", usuarioAdmin);
        const user = await createUserClient(nombre, apellido, telefono, fechaNacimiento, sexo, email, password, rol, estado, usuarioAdmin, plan_id_gym);
        res.status(201).json({ message: "Cliente creado correctamente", user });
    } catch (error) {
         console.log(error);
        res.status(500).json({ message: "Error creando el cliente", error: error.message });
    }
}

export const getAllClients = async (req, res) => {
    try {
        const clients = await getUsers();
        res.status(200).json({ message: "Clientes obtenidos correctamente", clients });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error obteniendo los clientes", error: error.message });
    }
}