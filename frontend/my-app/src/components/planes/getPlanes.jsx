
import {
  Box,
  Container,
  Paper,
  Grid,
  Button,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  InputLabel,
  Select,
  Divider
} from "@mui/material";
 
const GetPlanes = ({getPlan}) => {
    return(
        <div>
             <Typography variant="h5" align="center">
                <span style={{ color: "green",  }}>Planes</span> Disponibles
            </Typography>
            <Grid container spacing={2} sx={{mt:3}}>
            {getPlan.map((planes)=>(
                 
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 1, textAlign: "center", margin: "10px" }}> 
                         <Typography variant="body2" align="left">
                        {planes.nombre}
                        </Typography>
                    
                       <Typography sx={{mb:2,fontWeight: 300,color:"#4F9D69", fontSize:{xs:"2rem", sm:"2rem", md:"3rem"}}} align="left">
                           ${planes.precio}
                        </Typography>
                        <Typography variant="body2" align="left">
                      Este plan tiene una Duración de {planes.duracion} días
                        </Typography>
                        <Button
                         type="submit"
                         variant="contained"
                        size="large"
                       sx={{width:"100%", 
                        backgroundColor: "#4F9D69", ":hover": { backgroundColor: "#68D89B"}, mt:2} }
                        >
                        Gestionar Plan 
                         </Button>
                    </Box>
                </Grid>
                 
           
            ))}
              </Grid>
        </div>
    )
}
export default GetPlanes;