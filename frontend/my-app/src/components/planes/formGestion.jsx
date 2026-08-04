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
        <Container  >
             <Paper elevation={0} > 
                 <Typography variant="h5" align="center">
                            Crear Plan 
                        </Typography>
                         <form onSubmit={handleSubmit}>
                                 <Grid size={{ xs: 12, sm: 12, md: 6 }}    > 
                                    <TextField label="Nombre" variant="filled" name="nombre" onChange={handleChange}  />
                                </Grid> 
                                <Grid size={{ xs: 12, sm: 12, md: 6}}  > 
                                    <TextField label="Precio" variant="filled" name="precio" onChange={handleChange}  />
                                </Grid> 
                                <Grid size={{ xs: 12, sm: 12, md: 6}}  > 
                                    <TextField label="Duracion" variant="filled" name="duracion" onChange={handleChange} />
                                </Grid> 
                                     <Grid size={{ xs: 12, sm: 12, md: 12}}  > 
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{ 
                                             backgroundColor: "#292625", ":hover": { backgroundColor: "#544D4D"}} }
                                        >
                                        Crear Plan
                                        </Button>
                                </Grid> 
                         </form>

             </Paper>
        </Container>
       </div>     
 )
}
export default formularioPlanes;