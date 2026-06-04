const qrClient = async (id_usuario) => {
    try {
        const response = await fetch(`http://localhost:3000/api/cliente_qr/qr/${id_usuario}`, {
            method: "GET",
            credentials: "include",
            headers: {  
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener el código QR del cliente");
        }   
        const data = await response.json();
        return data.qrCode; // Devuelve solo el código QR
    } catch (error) {
        console.error("Error al obtener el código QR del cliente:", error);
        throw error;
    }
}
export default qrClient;    