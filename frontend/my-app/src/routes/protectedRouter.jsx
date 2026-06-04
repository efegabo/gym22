import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authProtected } from "../services/authProtected.js";

export const ProtectedRouter = ({ children, redirect = "/register" }) => {
    const [authorized, setAuthorized] = useState(undefined);
    // Validar el token al montar el componente
    useEffect(() => {
        // Evitar actualizar el estado si el componente se desmonta antes de que la promesa se resuelva
        let isMounted = true;
        // Función para validar el token en la ruta protegida
        const validate = async () => {
            const result = await authProtected();
            if (!isMounted) return;
            setAuthorized(Boolean(result));
        };

        validate();
        
        return () => {
            isMounted = false;
        };
    }, []);

    if (authorized === undefined) {
        return null;
    }

    return authorized ? children : <Navigate to={redirect} replace />;
};
