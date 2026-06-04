export async function createPlan(planData) {
    try {
        const response = await fetch("http://localhost:3000/api/planes/create", {
            method: "POST",
             credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(planData)
        });
        if (!response.ok) {
            throw new Error("Error al crear el plan");
        }   
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error al crear el plan:", error);
        throw error;
    }   
}

export async function getPlanes() {
    try {
        const response = await fetch("http://localhost:3000/api/planes/all/plan", {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Error al obtener los planes");
        }   
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error al obtener los planes:", error);
        throw error;
    }       
}