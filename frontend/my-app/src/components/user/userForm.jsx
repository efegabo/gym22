import { useState } from "react";
import { registerCliente } from "../../services/gestionUser/clientRegister";
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
  Select
} from "@mui/material";

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
                    <Container  >
                     <Paper elevation={0}
                            sx={{ p: 4, width:{xs: "100%",sm: "60%", md: "70%"}, borderRadius: 3, mx:"auto"}} > 
                        <Typography variant="h5" align="center">
                            Crear Cuenta de usuario
                        </Typography>
                         <form onSubmit={handleSubmit}>
                             <Grid container spacing={2} sx={{p:2 }}> 
                                <Grid size={{ xs: 12, sm: 12, md: 6 }}    > 
                                    <TextField label="Nombre" variant="filled" name="nombre" onChange={handleChange} sx={{width:"100%"}}/>
                                </Grid> 
                                <Grid size={{ xs: 12, sm: 12, md: 6}}  > 
                                    <TextField label="Apellido" variant="filled" name="apellido" onChange={handleChange} sx={{width:"100%"}}/>
                                </Grid> 
                                <Grid size={{ xs: 12, sm: 12, md: 6}}  > 
                                    <TextField label="Teléfono" variant="filled" name="telefono" onChange={handleChange} sx={{width:"100%"}}/>
                                </Grid> 
                                   <Grid size={{ xs: 12, sm: 12, md: 6}}  > 
                                    <TextField label="Fecha de Nacimiento" type="date" name="fechaNacimiento" onChange={handleChange} sx={{width:"100%"}} slotProps={{ inputLabel: {shrink: true,},}}/>
                                </Grid>
                                   <Grid size={{ xs: 12, sm: 12, md: 12}}  > 
                                    <TextField label="Email" variant="filled" name="email" onChange={handleChange} sx={{width:"100%"}}/>
                                 </Grid>
                                 <Grid size={{ xs: 12, sm: 12, md: 6}}  > 
                                    <TextField  label="Contraseña" variant="filled"  name="password" onChange={handleChange} sx={{width:"100%"}}/>
                                 </Grid>
                                 <Grid size={{ xs: 12, sm: 12, md: 6}}  > 
                                   <FormControl fullWidth>
                                     <InputLabel>Plan</InputLabel>
                                    <Select
                                        name="plan_id_gym"
                                        value={formData.plan_id_gym}
                                        label="Plan"
                                        onChange={handleChange}
                                          >
                                        {planes.map((plan) => (
                                        <MenuItem
                                            key={plan.id_plan}
                                            value={plan.id_plan}
                                        >
                                            {plan.nombre}
                                        </MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl> 
                                 </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 12}}  > 
                                        <FormControl>
                                        <FormLabel>Sexo</FormLabel>
                                        <RadioGroup
                                            row
                                            name="sexo"
                                            value={formData.sexo}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel
                                            value="Masculino"
                                            control={<Radio />}
                                            label="Masculino"
                                            />

                                            <FormControlLabel
                                            value="Femenino"
                                            control={<Radio />}
                                            label="Femenino"
                                            />

                                            <FormControlLabel
                                            value="Otro"
                                            control={<Radio />}
                                            label="Otro"
                                            />
                                        </RadioGroup>
                                        </FormControl>
                                 </Grid>
                                 <Grid size={{ xs: 12, sm: 12, md: 12}}  > 
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{width:"100%", 
                                             backgroundColor: "#292625", ":hover": { backgroundColor: "#544D4D"}} }
                                        >
                                        Crear Usuario
                                        </Button>
                                </Grid> 
                                    
                            </Grid> 
                         </form>
                         </Paper>
                    </Container>
                
             
   

            {/*<form onSubmit={handleSubmit}>
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
            </form>*/ }
        </div>
    );
}
export default formularioUser;