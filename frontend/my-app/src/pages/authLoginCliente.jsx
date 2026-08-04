import {Box, Paper,Container, Grid,Button, TextField, Typography} from "@mui/material";
 import  {Link} from "react-router-dom";
import { useState } from "react";
import {loginCli} from "../services/authLoginCliente";
 
import {useNavigate } from "react-router-dom";

const loginCliente = ()=> {
const navigate = useNavigate()
  const [formData, setFormData] = useState({
        email: "",
        password: ""
  })
   const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
      const handleLoginCliete = async(e)=> {
            e.preventDefault();
        
            try {
                  // Llama a la función de registro y espera la respuesta
                        const data = await loginCli(formData);
                        console.log("Usuario logueado:", data);
                      
                         navigate('/mainClient'); // Redirige al dashboard después del login exitoso
                    } catch (error) {
                        console.error("Error en el inicio de sesión:", error);
                    }
                    } 

    return (
        <div>
             <Typography variant="h5" mb={3} align="center" >
           Iniciar Sesión como cliente
          </Typography>
            <form onSubmit={handleLoginCliete} >   
                <Grid container spacing={2}  sx={{p:2 }} >
                   <Grid  size={{ xs: 12, sm: 12, md: 12 }}  >
                <TextField 
                label="Correo Electrónico"
                 variant="outlined" 
                 fullWidth
                  name="email"
                    onChange={handleChange}
                  />
                </Grid> 
                    <Grid  size={{ xs: 12, sm: 12, md: 12 }}>
                    <TextField
                label="Contraseña"
                    variant="outlined"
                    fullWidth
                    name="password"
                      onChange={handleChange}
                />
                </Grid>
                 <Grid  size={{ xs: 12, sm: 12, md: 12 }}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#292625", ":hover": { backgroundColor: "#544D4D" },
                   }}
              >
                Iniciar Sesión
              </Button>
                
                </Grid>
                 <p>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
                 </Grid>
            </form>
        </div>
    )
}

export default loginCliente