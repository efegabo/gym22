export async function logout() {
    try {
        const response = await fetch("http://localhost:3000/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Error logging out");
        }
        return await response.json();
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
}