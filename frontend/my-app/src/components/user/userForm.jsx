import Input from "../input";
import { useState } from "react";
import  {registerCliente}  from "../../services/gestionUser/clientRegister";
const formularioUser = ({ planes }) => {
     const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        fechaNacimiento: "",
        sexo: "",
        email: "",
        password: "",
        plan_id_gym: ""
    }); 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerCliente(formData);  
            console.log("Cliente creado:", data);
        } catch (error) {
            console.error("Error al crear el cliente:", error);
        }
  }
    return (
        <div>
            
            <h1>Formulario de Usuario</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre</label>
            <Input label="Nombre" type="text" name="nombre" onChange={handleChange} />
            <label htmlFor="apellido">Apellido</label>
            <Input label="Apellido" type="text" name="apellido" onChange={handleChange} />
            <label htmlFor="telefono">Teléfono</label>
            <Input label="Teléfono" type="text" name="telefono" onChange={handleChange} />
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <Input label="Fecha de Nacimiento" type="date" name="fechaNacimiento" onChange={handleChange} />
            <label htmlFor="sexo">Sexo</label>
            <Input label="Sexo" type="text" name="sexo" onChange={handleChange} />
             <label htmlFor="email">Email</label>
             <Input label="Email" type="email" name="email" onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <Input label="Password" type="password" name="password" onChange={handleChange} />
                <select
                name="plan_id_gym"
                value={formData.plan_id_gym}
                onChange={handleChange}
            >

                <option value="">
                    Seleccione un plan
                </option>

                {planes.map((plan) => (
                    <option
                        key={plan.id_plan}
                        value={plan.id_plan}
                    >
                        {plan.nombre}
                    </option>
                ))}

            </select>
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
}
export default formularioUser;