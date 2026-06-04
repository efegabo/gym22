export const authProtected = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/auth/protected", {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        return data;
    } catch (error)         {
        console.error("Error al validar el token en la ruta protegida:", error);
        return false;
    }
};