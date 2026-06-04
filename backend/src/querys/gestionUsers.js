import createDatabase from "../bd.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
export async function createUserClient(nombre, apellido, telefono, fechaNacimiento, sexo, email, password, rol, estado, usuarioAdmin, plan_id_gym) {
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    try {
        const [adminGym]= await connection.query('SELECT id_gym FROM usuario WHERE id_usuario = ?', [usuarioAdmin]);
        if (adminGym.length === 0) {
         throw new Error("No se encontró el administrador");
            }
            
            const id_gym = adminGym[0].id_gym;
            const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await connection.query('INSERT INTO usuario (nombre, apellido, telefono, fecha_nacimiento, sexo, email, passwordd, rol, estado, id_gym, usuarioAdmin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellido, telefono, fechaNacimiento, sexo, email, hashedPassword, rol, estado, id_gym, usuarioAdmin]);
        const userId = result.insertId;
        await connection.query('INSERT INTO suscripciones (id_usuario, id_plan, fecha_registro, fecha_fin, estado) VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), ?)', [userId, plan_id_gym, 'activo']);
       // Generar un código QR único para el usuario
        const codigoQr = crypto.randomUUID();
        console.log("Código QR generado:", codigoQr);
            // Guardar el código QR en la base de datos
        await connection.query('INSERT INTO qr_codigos (id_usuario, codigo_qr) VALUES (?, ?)', [userId, codigoQr]);
        return {
            message: "Usuario creado correctamente"
        };
    } catch (error) {
        throw error;
    } finally {
        await connection.release();
    }
}
export async function getUsers() {
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT id_usuario, nombre, apellido, telefono,  rol, estado FROM usuario where rol = "cliente"');
        return rows;
    }
    catch (error) {
        throw error;
    }
    finally {
        await connection.release();
    }
}   

export const obtenerQrporUsuario = async (id_usuario) => {
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    try {
       
        const [rows] = await connection.query('SELECT codigo_qr FROM qr_codigos WHERE id_usuario = ?', [id_usuario]);
       
        if (rows.length === 0) {
            throw new Error("No se encontró el código QR para el usuario");
        }   
        return rows[0].codigo_qr;
    }
    catch (error) {
        throw error;
    }
    finally {
        await connection.release();
    }
}   