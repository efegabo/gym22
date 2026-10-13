import createDatabase from "../bd.js";
export async function obtenerInformacionCliente(uidd) {
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    try {
    const [rows] = await connection.execute( 
        `select usuario.nombre AS nombre_Usuario, usuario.apellido, usuario.estado,
        qr_codigos.fecha_generacion, suscripciones.estado,
        suscripciones.fecha_fin, planes.nombre AS nombre_Plan from qr_codigos inner join 
        usuario on qr_codigos.id_usuario = usuario.id_usuario 
        inner join suscripciones on usuario.id_usuario = suscripciones.id_usuario
        inner join planes on suscripciones.id_plan = planes.id_plan 
        where qr_codigos.codigo_qr = ? `, [uidd]);
    
    return rows[0];
    } catch (error) {
        console.error("Error al obtener la información del cliente:", error);
        throw error;
    }
    finally {
        await connection.release();
    }
}
