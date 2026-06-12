import Input from "../components/input";
 
import {useNavigate } from "react-router-dom";
 import  {Link} from "react-router-dom";
import {login} from "../services/autLogin";
import {Box, Paper,Container, Grid,Button, TextField, Typography} from "@mui/material";
import { useState } from "react";
function loginUser() {
  const  navigate = useNavigate();
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
                  
                     navigate('/dashboard'); // Redirige al dashboard después del login exitoso
                } catch (error) {
                    console.error("Error en el inicio de sesión:", error);
                }
                } 
    return (
        <div>
            <Grid container >
                <Grid size={{ xs: 12, sm: 12, md: 6 }} 
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}> 
            <Container maxWidth="sm" 
         
                sx={{
             width: {
             xs: "90%",
               sm: "60%",
               md: "70%",
               },
               mt: { xs: 7 },
              padding: "2rem",
              borderRadius: "1rem",
            
            }}  
              > 
            <Typography variant="h5" mb={3} align="center" >
           Iniciar Sesión
          </Typography>
            <form onSubmit={handleLogin}>   
                <Grid container spacing={2}  sx={{p:2 }} >
                   <Grid  size={{ xs: 12, sm: 12, md: 12 }}  >
                <TextField 
                label="Correo Electrónico"
                 variant="outlined" 
                 fullWidth
                  name="email"
                  onChange={handleChange} />
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
                 </Grid>
            </form>
            <p>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
            </Container>
             <div>
             
            </div>
                </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6 }}
                    sx={{display: { xs: "none", md: "block" } }}>
                    <Box
                    component="img"
                    src="/public/gymH.jpg"
                    alt="Imagen de Gimnasio"
                    sx={{
                        width: "100%",
                        height: "100vh",
                        objectFit: "cover",
                    }}
                    />
                 
                    </Grid>
                </Grid>
        </div>
    )
   

}
export default loginUser;   