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
        await connection.query('INSERT INTO suscripciones (id_usuario, id_plan, fecha_registro, fecha_fin, estado) VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), ?)', [userId, plan_id_gym, 'Activo']);
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
export const deleteUser = async (id_usuario)=>{
          const pool = await createDatabase();
    const connection = await pool.getConnection();
    try{
        console.log("ID recibido:", id_usuario);
     const [result]= await connection.query('delete from usuario where id_usuario = ?',[id_usuario] )  

     if(result.affectedRows==0){
        return{succes:false, message:"No se encontro usuario"}
     }
      return{
        succes:true,
        result,
        message:"usuario eliminado Correctamente"
      }
    }catch(error)
    {
        throw error;
    }finally {
        await connection.release();
    }
}


export async function getUsers(usuarioAdmin) {
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT u.id_usuario, u.nombre, u.apellido, u.telefono,  u.rol, s.estado FROM suscripciones s INNER JOIN usuario u ON u.id_usuario = s.id_usuario where u.rol = "cliente" AND  u.usuarioAdmin =?', [usuarioAdmin]);
        return rows;
    }
    catch (error) {
        throw error;
    }
    finally {
        await connection.release();
    }
}  
export async function getUserId(id_usuario){
     const pool = await createDatabase();
    const connection = await pool.getConnection();
     try {
        const [rows] = await connection.query('SELECT * from usuario where id_usuario =?', [id_usuario]);
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

export const registrarAsistencia = async (uidd, id_gym)=>{
     const pool = await createDatabase();
    const connection = await pool.getConnection();
        try{
            
            const [usuarioUidd]= await connection.query('select u.id_usuario, u.nombre, q.codigo_qr, s.id_suscripcion, s.fecha_fin, s.estado, p.nombre as Plan, p.precio from qr_codigos q inner join usuario u on q.id_usuario = u.id_usuario inner join suscripciones s on u.id_usuario = s.id_usuario inner join planes p on s.id_plan =p.id_plan where q.codigo_qr=? ', [uidd])
             if (usuarioUidd.length === 0) {
            throw new Error("No se encontró el cliente");
        }   
           const id_usuario = usuarioUidd[0].id_usuario;
            await connection.query('insert into asistencia (id_usuario, id_gym, fecha_asistencia) values (?, ?, NOW())', [id_usuario, id_gym]);
            return usuarioUidd
            
        }catch(error){
            throw error
        }
        finally {
        await connection.release();
    }
}

 export const getAsistencias = async (id_gym) => {
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(`SELECT
              a.id_asistencia,
                u.id_usuario,
                u.nombre AS Cliente,
                    DATE_FORMAT(a.fecha_Asistencia, '%H:%i') AS Hora,
                    CASE
                        WHEN s.estado = 'activo' THEN 'Activo'
                        ELSE 'Vencida'
                    END AS Estado
                FROM asistencia a
                INNER JOIN usuario u
                    ON a.id_usuario = u.id_usuario
                INNER JOIN suscripciones s
                    ON s.id_usuario = u.id_usuario
                WHERE a.id_gym = ?
                ORDER BY a.fecha_Asistencia DESC
                LIMIT 3;`, [id_gym]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        await connection.release();
    }
};

export const cantidadPlanes = async (id_usuario) => {
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            `
            SELECT
                  p.nombre,
                    COUNT(s.id_suscripcion) AS cantidad
                    FROM planes p
                    LEFT JOIN suscripciones s
                     ON p.id_plan = s.id_plan
                    WHERE p.id_usuario = ?
                    GROUP BY p.id_plan, p.nombre;
            `, [id_usuario]

        );
        // [{ nombre: 'Plan A', cantidad: 5 }, { nombre: 'Plan B', cantidad: 3 }, ...]
        return rows;
    } catch (error) {
        throw error;
    }
    finally {
        await connection.release();
    }
 }

 export const cantidadClientesActivos = async (id_usuario, estado) => {
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            `
            SELECT COUNT(*) AS usuarios_activos
                FROM suscripciones s
                INNER JOIN usuario u
                    ON s.id_usuario = u.id_usuario
                WHERE s.estado = ?
                AND u.id_gym = ?;
            `,
            [id_usuario, estado]
        );
        return rows[0].usuarios_activos; // Devuelve solo el número de usuarios activos
        
    } catch (error) {
        throw error;
    } finally {
        await connection.release();
    }
};

 export const cantidadTotalClientes = async (idGym) => {
    const pool = await createDatabase();
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.query(
            `
            SELECT COUNT(*) AS cantidad
            FROM usuario
            WHERE id_gym = ?;
            `,
            [idGym]
        );

        return rows[0].cantidad;

    } finally {
        connection.release();
    }
};

export const actualizarEstadoDeSuscribciones = async ()=>
{
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    try {
        await connection.query(`
            UPDATE suscripciones
            SET estado = CASE
                WHEN fecha_fin >= CURDATE() THEN 'Activo'
                ELSE 'Vencida'
            END
        `);
              
    } finally {
        connection.release();
    }
}
 
export const obtenerAsistenciaClienteId = async(id_usuario)=>{
    const pool = await createDatabase();
    const connection = await pool.getConnection();
     try {
        const [rows] = await connection.query(
            `
           select fecha_Asistencia from asistencia where id_usuario = ?;
            `,
            [id_usuario]
        );

        return rows;

    } finally {
        connection.release();
    }
}

export const cantidadHoras = async(id_gym)=>{
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            `
             select hour(fecha_asistencia) as hora,
              count(*) as Cantidad
              from asistencia where id_gym = ?
              group by hour(fecha_asistencia) order by hora;
            `,
            [id_gym]
        );
        return rows;
    } finally {
        connection.release();
    }
}