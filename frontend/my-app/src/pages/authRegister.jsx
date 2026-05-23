import Input from "../components/input";
import Button from "../components/button";
import {useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/apiAuthRegister";
import  {Link} from "react-router-dom";
 
function AuthRegister() {
    const navigate = useNavigate();
    // Estado para almacenar los datos del formulario
    const[formData, setFormData] = useState({
        nombre_gym: "",
        name: "",
        email: "",
        password: ""
    });
    // Maneja el cambio en los campos del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,// Mantiene los datos anteriores
            // Actualiza el campo correspondiente con el nuevo valor
            [e.target.name]: e.target.value// Accede al nombre del campo y su valor
        });
    }
    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            // Llama a la función de registro y espera la respuesta
            const data = await registerUser(formData);
            console.log("Usuario registrado:", data);
            navigate('/login'); // Redirige al login después del registro
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    }
    return (
         <> 
        <div className="auth"> 
            <h2>Registro de Usuario</h2>   
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Nombre Gym</label>
                <Input name="nombre_gym" type="text" placeholder="Nombre del Gym" onChange={handleChange} />
                <label htmlFor="">Nombre Usuario</label>
                <Input name="name" type="text" placeholder="Nombre del Usuario" onChange={handleChange} />
                <label htmlFor="">Correo Electrónico</label>
                <Input name="email" type="email" placeholder="Correo Electrónico" onChange={handleChange} />
                <label htmlFor="">Contraseña</label>
                <Input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
                <Button text="Registrar" />
            </form>
        </div>
         <div>
            <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
            </div>
        </>
       
    )
}
export default AuthRegister;