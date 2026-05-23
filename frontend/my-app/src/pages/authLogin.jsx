import Input from "../components/input";
import Button from "../components/button";
import {login} from "../services/autLogin";
import { useState } from "react";
function loginUser() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    const handleLogin = async(e)=> {
        e.preventDefault();
        console.log(formData);
        try {
              // Llama a la función de registro y espera la respuesta
                    const data = await login(formData);
                    console.log("Usuario logueado:", data);
                    //navigate('/login');   
                } catch (error) {
                    console.error("Error en el inicio de sesión:", error);
                }
                } 
    return (
        <div>
            <h2>Login de Usuario</h2>
            <form onSubmit={handleLogin}>   
                <label htmlFor="">Correo Electrónico</label>
                <Input name="email" type="email" placeholder="Correo Electrónico" onChange={handleChange} />
                <label htmlFor="">Contraseña</label>
                <Input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
                <Button text="Iniciar Sesión" />
            </form>
        </div>
    )
   

}
export default loginUser;   