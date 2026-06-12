import {createPlanes, getPlanes} from "../querys/planes.js";
export const createPlan = async (req, res) => {
    try {
        const {nombre, precio, duracion} = req.body;
        await createPlanes(nombre, precio, duracion);
        res.status(201).json({message: "Plan creado"})
    } catch (error) {
        res.status(500).json({message: "Error creando el plan", error: error.message})
    }
}
export const getAllPlanes = async(req, res) => {
    try {
        const planes = await getPlanes();
        res.status(200).json(planes);
    } catch (error) {
        res.status(500).json({message: "Error obteniendo los planes", error: error.message})
    }
}

 