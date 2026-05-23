export async function login(formData) {
    try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {  
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData), 
            credentials: "include"
        });
        if (!response.ok) {
            throw new Error("Error al iniciar sesión");
            return await response.json();
        } 
        const data = await response.json();
        return data;

}   catch (error) { 
        console.error("Error en el inicio de sesión:", error);
        throw error;
    }

     }