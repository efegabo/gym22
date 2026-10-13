 
import {createUserClient, getUsers,getUserId,deleteUser, registrarAsistencia, getAsistencias, 
    cantidadPlanes, cantidadClientesActivos, cantidadTotalClientes, actualizarEstadoDeSuscribciones,
     obtenerAsistenciaClienteId, cantidadHoras} from "../../querys/gestionUsers.js";

export const createClient = async (req, res) => {
   try {
        const { nombre, apellido, telefono, fechaNacimiento, sexo, email, password, plan_id_gym } = req.body;
        const rol = 'cliente'; // Asignar un rol predeterminado
        const estado = 'Activo'; // Asignar un estado predeterminado
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
        const admin = req.id;
        const clients = await getUsers(admin);
        res.status(200).json({ message: "Clientes obtenidos correctamente", clients });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error obteniendo los clientes", error: error.message });
    }
}

export async function getClientId(req,res){
     try {
        const cliente = req.id
        console.log("cliente",cliente)
        const usuario = await getUserId(cliente)
        
        res.status(200).json({ message: "Los datos del cliente:", usuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error obteniendo los clientes", error: error.message });
    } 
}

export const deleteUserCliente = async (req, res)=>{
    try{
        const {id_usuario } = req.params
         console.log("ID:", id_usuario );
        const usuario = await deleteUser(id_usuario )
        if(usuario.affectedRows==0){
            return res.status(404).json({message:"No se encontro el usuario para eliminar"})
        }
        res.status(200).json({ message: "cliente eliminado", usuario });
    }catch(error){
          console.log(error);
        res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
    }
}

export const registrarAsistencias = async (req, res) => {
    try {
        const { uidd } = req.body;
        const id_gym = req.id_gym; // Obtener el ID del gimnasio desde el token de autenticación
        const asistencia = await registrarAsistencia(uidd, id_gym);
        console.log("Asistencia registrada:", uidd, id_gym, asistencia);
        res.status(200).json({ message: "Asistencia registrada correctamente", asistencia });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error registrando la asistencia", error: error.message });
    }
    }
    export const getUltimasAsistencias = async (req, res)=>{
    try {
        const id_gym = req.id_gym;
        const asistencias = await getAsistencias(id_gym)
        res.status(200).json({message:"Asistencias obtenidas:", asistencias})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error obteniendo las asistencias", error: error.message });
    }
      }

      export const cantidadPlanesPorGym = async (req, res) => {
        try {
            const admin = req.id;
            const planes = await cantidadPlanes(admin); 
            res.status(200).json({ message: "Cantidad de planes obtenida correctamente", planes });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error obteniendo la cantidad de planes", error: error.message });
        }
    }
   
    export const cantidadClientesPorGym = async (req, res) => {
    try {
        const id_gym = req.id_gym;
        const { estado } = req.params;

         // Convertir el estado recibido a mayúsculas para que coincida con los valores en la base de datos
        const estadoBD = estado === "activo" ? "Activo" : "Inactivo";

        const clientes = await cantidadClientesActivos(
            estadoBD,
            id_gym
        );

        res.status(200).json({
            clientes
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


  export const cantidadTotalClientesPorgym = async (req, res) => {
        try {
            const id_gym = req.id_gym;
            const total = await cantidadTotalClientes(id_gym); 
            res.status(200).json({ message: "Cantidad de clientes", total });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error obteniendo la cantidad de clientes", error: error.message });
        }
    }

    export const actulizarEstados = async (req, res)=>{
        try {
            
            const actualizarEstadp = await actualizarEstadoDeSuscribciones(); 
            res.status(200).json({ message: "Estado Actualizado" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al actualizar el estado" });
        }
    }

    export const asistenciaClienteId = async (req, res)=>{
        try {
                 const cliente = req.id;
            const asistenciaiD = await obtenerAsistenciaClienteId(cliente); 
            res.status(200).json({ message: "asistencia del usuario", asistenciaiD });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al Obtener asistencia del usuario" });
        }
    }

    export const estadisticasHoras= async (req, res)=>{
        try{
            const id_gym = req.id_gym;
            const estadisticas = await cantidadHoras(id_gym);
            res.status(200).json({ message: "Estadisticas de horas obtenidas correctamente", estadisticas });
        }catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error obteniendo las estadisticas de horas", error: error.message });
        }
     }
     