import {Box, Paper,Container, Grid,Button, TextField, Typography} from "@mui/material";
 import {createPlan} from "../../services/planesServices";
  import { useState } from "react";
function formularioPlanes(){
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
 return(
       <div>
        
             
               <Grid container spacing={2}  sx={{p:2, display:"flex" }} >
                 <Box>
                    <Typography  sx={{mb:2,fontWeight: 300, fontSize:{xs:"2rem", sm:"2rem", md:"3.5rem"}}} >
                        Crea los planes <br /> 
                         de tu gimnasio.
                    </Typography>
                     <Typography variant="body2" align="left">
                           Crea los planes de tu gimnasio y asignalos a tus   clientes para que <br/>puedan  disfrutar de todos los beneficios que ofrecemos.
                        </Typography>
                 </Box>
                    <Grid sx={{backgroundColor:"#f5f5f5" , p:4}} size={{ xs: 12, sm: 12, md: 6}}   >
                         <form onSubmit={handleSubmit}>
                                 <Grid size={{ xs: 12}} sx={{mb:2}}   > 
                                    <TextField fullWidth label="Nombre" variant="filled" name="nombre" onChange={handleChange}  />
                                </Grid> 
                                <Grid container spacing={2}   >
                                <Grid size={{ xs: 12, md: 6}}  > 
                                    <TextField fullWidth label="Precio" variant="filled" name="precio" onChange={handleChange}  />
                                </Grid> 
                                <Grid size={{ xs: 12, md: 6}}  > 
                                    <TextField fullWidth label="Duracion" variant="filled" name="duracion" onChange={handleChange} />
                                </Grid> 
                                </Grid>
                                     <Grid size={{ xs: 12, sm: 12, md: 12}} sx={{mt:2}}  > 
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                         sx={{width:"100%", 
                                             backgroundColor: "#4F9D69", ":hover": { backgroundColor: "#68D89B"}} }
                                        >
                                        Crear Plan
                                        </Button>
                                </Grid> 
                         </form>
                       
                    </Grid>
            </Grid>
       
       </div>     
 )
}
export default formularioPlanes;