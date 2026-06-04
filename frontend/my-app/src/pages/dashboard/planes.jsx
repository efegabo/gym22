 import Input from "../../components/Input";
 import Button from "../../components/button";
 import {createPlan} from "../../services/planesServices";
 import { useState } from "react";
 
const planes = () => {
    const [planes, setPlanes] = useState({
        nombre: "",
        precio: "",
        duracion: ""
    });
    const handleChange = (e) => {
        setPlanes({
            ...planes,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await createPlan(planes);
            console.log("Plan creado:", data);
        } catch (error) {
            console.error("Error al crear el plan:", error);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h1>Planes</h1>
                <p> gestionar los planes de tu gimnasio.</p>
                <label htmlFor="nombre">Nombre del Plan</label>
                <Input label="Nombre del Plan" type="text" name="nombre" onChange={handleChange} />
                <label htmlFor="precio">Precio</label>
                <Input label="Precio" type="text" name="precio" onChange={handleChange} />
                <label htmlFor="duracion">Duración</label>
                <Input label="Duración" type="text" name="duracion" onChange={handleChange} />
                <Button text="Crear Plan" />
            </form>
        </div>
    );
}
export default planes;