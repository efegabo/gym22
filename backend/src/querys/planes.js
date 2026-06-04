import createDatabase from "../bd.js";
export const createPlanes = async (nombre, precio, duracion) => {
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    try{
        const [resultPlan]= await connection.query('INSERT INTO planes (nombre, precio, duracion) VALUES (?, ?, ?)', [nombre, precio, duracion]);
    }catch (error) {
        console.error('Error creating plan:', error);
        throw error;
    }   finally {
        connection.release();
    }
}
export const getPlanes = async () => {
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM planes');
        return rows;
    } catch (error) {
        console.error('Error fetching plans:', error);
        throw error;
    } finally {
        connection.release();
    }      
}