 
 import gym  from '/public/gymH.jpg';
import {useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/apiAuthRegister";
import  {Link} from "react-router-dom";
import {Box,Container , Paper, Grid,Button, TextField, Typography} from "@mui/material";
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
         <Grid container > 
          <Grid size={{ xs: 12, sm: 12, md: 6 }}
          // El prop sx se utiliza para aplicar estilos específicos a este componente Grid. En este caso, se está utilizando para controlar la visibilidad del componente en función del tamaño de la pantalla. La propiedad display se establece en "none" para pantallas extra pequeñas (xs) y pequeñas (sm), lo que significa que el componente no se mostrará en esos tamaños de pantalla. Para pantallas medianas (md) y más grandes, display se establece en "block", lo que permite que el componente sea visible.
           sx={{ display: { xs: "none", md: "block" } }}> 
            <Box 
            // Usa el componente Box para mostrar la imagen de fondo, es decir, box se comportará como un contenedor para la imagen
            component="img"
            //accede a la imagen de fondo, en este caso, se asume que la imagen está ubicada en la carpeta public del proyecto y se llama "gymH.jpg". La ruta "/public/gymH.jpg" es relativa a la raíz del proyecto.
              src={gym}
             
            alt="Imagen de Gimnasio"
            // Estilos para la imagen, ajustándola al contenedor
            sx={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
            }}
            />
          </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}
            //sx es una prop de estilo en Material-UI que permite aplicar estilos directamente al componente. En este caso, se están aplicando estilos para centrar el contenido dentro de esta sección del grid.
              sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>  

             <Container
             // El componente Container se utiliza para envolver el contenido del formulario de registro, proporcionando un diseño más limpio y centrado. El prop sx se utiliza para aplicar estilos específicos a este componente Container. En este caso, se están aplicando estilos para controlar el ancho del contenedor en diferentes tamaños de pantalla (xs, sm, md) y para agregar padding y border-radius.
          
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
        
           <Typography variant="h5" mb={3} align="center"    >
            Registro de Usuario
          </Typography>
            <form onSubmit={handleSubmit}>
               <Grid container    spacing={2} sx={{p:2 }} >

                <Grid  size={{ xs: 12, sm: 12, md: 12 }}>
                <TextField 
                label="Nombre del Gym"
                 variant="outlined" 
                 fullWidth
                  name="nombre_gym"
                  onChange={handleChange} />
                </Grid>
                 <Grid  size={{ xs: 12, sm: 12, md: 6 }}>
                <TextField 
                label="Nombre del Usuario"
                 variant="outlined" 
                 fullWidth
                  name="name"
                  onChange={handleChange} />
                </Grid>
                  <Grid  size={{ xs: 12, sm: 12, md: 6 }}>
                <TextField 
                label="Apellido del Usuario"
                    fullWidth
                 variant="outlined" 
                  name="apellido"
                  onChange={handleChange} />
                </Grid>
                 <Grid  size={{ xs: 12, sm: 12, md: 12 }}>
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
                  onChange={handleChange} />
                </Grid>
                <Grid  size={{ xs: 12, sm: 12, md: 12 }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                sx={{ bgcolor: "#292625", "&:hover": { backgroundColor: "#544D4D" } }}
              >
                Registrarse
              </Button>
            </Grid>
                
                </Grid>
            </form>
         
         <div>
            <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
            </div>

            </Container>
            </Grid>
        </Grid>

        </>
       
    )
}
export default AuthRegister;