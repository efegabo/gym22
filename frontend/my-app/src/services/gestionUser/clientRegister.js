export const registerCliente = async (formData) => {
    try {
    const response = await fetch("http://localhost:3000/api/cliente/createCliente", {
        method: "POST",
         credentials: "include",
        headers: {
            "Content-Type": "application/json",
            },
             body: JSON.stringify(formData)
    });
   if (!response.ok) {
        throw new Error("Error al registrar el cliente");
    }
    const data = await response.json();
    return data;
   } catch (error) {
        console.error("Error al registrar el cliente:", error);
        throw error;
    }
}
