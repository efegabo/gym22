 const getClientes = async () => {
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
export default getClientes;