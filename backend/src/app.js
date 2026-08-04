import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
  
const app = express();
import createDatabase from './bd.js';
import cookieParser from "cookie-parser";
app.use(cookieParser());    
createDatabase();
const port = 3000;
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
// Importar rutas
import authRoutes from "./routes/auth.js";
import planesRoutes from "./routes/planes.js";
import clienteRoutes from "./routes/cliente/createCliente.js";
import getClienteRoutes from "./routes/cliente/getCliente.js";
import getQrCodes from "./routes/cliente/qrCodes.js";
import authCliente from './routes/authCliente.js'
// Usar rutas
app.use("/api/auth", authRoutes);
app.use("/api/planes", planesRoutes);
app.use("/api/cliente", clienteRoutes);
app.use("/api/cliente", getClienteRoutes);
app.use("/api/cliente_qr", getQrCodes);
app.use("/api/asistencia", getQrCodes);
app.use('/api/clienteProfile', authCliente)
app.use("/api/ultimasAsistencias", authCliente)
app.use("/api/planes", authCliente)
 app.use("/api/cantidadTotalClientes", getClienteRoutes)
app.use("/api/cantidadClienteActivos", getClienteRoutes)
app.listen(port, ()=>{
    console.log("servidor escuchando pueto:", port)
})