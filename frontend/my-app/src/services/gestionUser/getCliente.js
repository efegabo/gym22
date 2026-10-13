 export const getClientes = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/cliente/getAllClients", {
            method: "GET",  
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }); 
        if (!response.ok) {
            throw new Error("Error al obtener los clientes");
        }
        const data = await response.json();
        return data.clients; // Devuelve solo la lista de clientes
    }
    catch (error) {
        console.error("Error al obtener los clientes:", error);
        throw error;
    }   
}

export const getClienteId = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/clienteProfile/user/client`, {
            method: "GET",  
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }); 
        if (!response.ok) {
            throw new Error("Error al obtener el cliente");
        }
        const data = await response.json();
        console.log(data)
        return data;  
    }
    catch (error) {
        console.error("Error al obtener el cliente:", error);
        throw error;
    }   
}

 export const deleteCliente = async (id_usuario) => {
    try {
        const response = await fetch(`http://localhost:3000/api/cliente/deleteUser/${id_usuario}`, {
            method: "delete",  
            credentials: "include",
            
        }); 
        if (!response.ok) {
            throw new Error("Error al obtener la api");
        }
        const data = await response.json();
        console.log(data)
        return data;  
    }
    catch (error) {
        console.error("Error al eliminar:", error);
        throw error;
    }   
}

export const registrarAsistencia = async (uidd) => {
    try {
        const response = await fetch(`http://localhost:3000/api/asistencia/registrar`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uidd }),
        });
        if (!response.ok) {
            throw new Error("Error al registrar la asistencia");
        }   
        const data = await response.json();
        console.log(data);
        return data;
    }   
    catch (error) {
        console.error("Error al registrar la asistencia:", error);
        throw error;
    }
}

export const getUltimasAsistencias = async () => {
    try {
        const ultAsistencias = await fetch("http://localhost:3000/api/ultimasAsistencias/asistencias", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!ultAsistencias.ok) {
            throw new Error("Error al obtener las últimas asistencias");
        }
        const data = await ultAsistencias.json();
        return data;
    } catch (error) {
        console.error("Error al obtener las últimas asistencias:", error);
        throw error;
    }
}

 export const cantidadPlanes = async () => {
    try {
        const ultAsistencias = await fetch("http://localhost:3000/api/planes/planesCantidad", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!ultAsistencias.ok) {
            throw new Error("Error al obtener la cantidad de planes");
        }
        const data = await ultAsistencias.json();
        return data;
    } catch (error) {
        console.error("Error al obtener la cantidad de planes:", error);
        throw error;
    } }

    export const cantidadClientes = async (estado) => {
    try {
        const cantUsua = await fetch(`http://localhost:3000/api/cantidadClienteActivos/cantidadClientes/${estado}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!cantUsua.ok) {
            throw new Error("Error al obtener la cantidad de clientes");
        }
        const data = await cantUsua.json();
        return data;
    } catch (error) {
        console.error("Error al obtener la cantidad de clientes:", error);
        throw error;
    } 
}

export const cantidadClientesTotal = async () => {
    try {
        const cantUsua = await fetch(`http://localhost:3000/api/cantidadTotalClientes/getAllClientsNumbers`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!cantUsua.ok) {
            throw new Error("Error al obtener la cantidad total de clientes");
        }
        const data = await cantUsua.json();
        return data;
    } catch (error) {
        console.error("Error al obtener la cantidad total de clientes:", error);
        throw error;
    } 
}
 export const actualizarClienteEstado = async () => {
    try {
        const actualizarEstados = await fetch("http://localhost:3000/api/cliente/suscripciones/actualizar-estados", {
            method: "PuT",
            credentials: "include",
             
        });
         
        const data = await actualizarEstados.json();
        return data;
    } catch (error) {
        console.error("Error al actualizar los estados:", error);
        throw error;
    } }
export const asistenciaIdCliente = async () => {
    try {
        const cantUsua = await fetch(`http://localhost:3000/api/cliente/getAsistenciasId`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!cantUsua.ok) {
            throw new Error("Error al obtener la asistencia del usuario");
        }
        const data = await cantUsua.json();
        return data;
    } catch (error) {
        console.error("Error al obtener la asistencia del usuario:", error);
        throw error;
    } 
}

export const horasEstadisticas = async () => {
    try {
        const cantUsua = await fetch(`http://localhost:3000/api/cliente/estadisticasHoras`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!cantUsua.ok) {
            throw new Error("Error al obtener las estadisticas de horas");
        }
        const data = await cantUsua.json();
        return data;
    } catch (error) {
        console.error("Error al obtener las estadisticas de horas:", error);
        throw error;
    } 
}