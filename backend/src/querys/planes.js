import createDatabase from "../bd.js";
export const createPlanes = async (nombre, precio, duracion, id_usuario) => {
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    try{
        const [resultPlan]= await connection.query('INSERT INTO planes (nombre, precio, duracion, id_usuario) VALUES (?, ?, ?, ?)', [nombre, precio, duracion, id_usuario]);
    }catch (error) {
        console.error('Error creating plan:', error);
        throw error;
    }   finally {
        connection.release();
    }
}
export const getPlanes = async (id_usuario) => {
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM planes WHERE id_usuario = ?', [id_usuario]);
        return rows;
    } catch (error) {
        console.error('Error fetching plans:', error);
        throw error;
    } finally {
        connection.release();
    }      
}