import createDatabase from "../bd.js";
import bcrypt from "bcryptjs";

//unir con el registro de usuarios, para que al registrar un nuevo usuario se pueda asignar a un gimnasio existente
export async function register(nombreGym,nombre, email, password, rol, estado, id_gym) {
     const pool = await createDatabase();
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        // Insertar el nuevo gimnasio y obtener su ID
        const [gymResult] = await connection.query('INSERT INTO gym (nombre) VALUES (?)', [nombreGym]);
        const gymId = gymResult.insertId;
        //verificar que el usuario ya exista
        const [existingUser] = await connection.query('SELECT * FROM usuario WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            throw new Error('User with this email already exists');
        }
        // Insertar el nuevo usuario con el ID del gimnasio
        const hashedPassword = await bcrypt.hash(password, 10);
        const [userResult] = await connection.query('INSERT INTO usuario (nombre, email, passwordd, rol, estado, id_gym) VALUES (?, ?, ?, ?, ?, ?)', [nombre, email, hashedPassword, rol, estado, gymId]);
        // Confirmar la transacción
        await connection.commit();
        // Devolver el ID del nuevo usuario
        return userResult.insertId;
    }catch (error) {
        await connection.rollback();
        console.error('Error registering user and gym:', error);
        throw error;
    }finally {
        connection.release();
    }
} 
//función para obtener un usuario por su email, se utiliza en el login para verificar si el usuario existe y comparar la contraseña
export const getUserByEmail = async (email) => {
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM usuario WHERE email = ?', [email]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    } finally {
        connection.release();
    }   
}

 
 