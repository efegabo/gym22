import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import createDatabase from './bd.js';
createDatabase();
const port = 3000;
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
// Importar rutas
import authRoutes from "./routes/auth.js";

// Usar rutas
app.use("/api/auth", authRoutes);
 
app.listen(port, ()=>{
    console.log("servidor escuchando pueto:", port)
})