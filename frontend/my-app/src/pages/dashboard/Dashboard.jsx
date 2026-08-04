import ButtonLogout from "../../components/buttonLogout";
 

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
  Dialog, 
  Chip
} from "@mui/material";
import Sidebar from "../../components/sidebar";
 import { DataGrid } from '@mui/x-data-grid';  
import GroupIcon from '@mui/icons-material/Group';
  import ListItemIcon from '@mui/material/ListItemIcon';
  import Divider from "@mui/material/Divider";
  import CalculateIcon from '@mui/icons-material/Calculate';
  import AddReactionIcon from '@mui/icons-material/AddReaction';
  import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
  import DescriptionIcon from '@mui/icons-material/Description';
import {getUltimasAsistencias, cantidadPlanes, cantidadClientes, cantidadClientesTotal, actualizarClienteEstado} from "../../services/gestionUser/getCliente";
import { useState, useEffect } from "react";
import {PieChart, Pie, Cell, Legend, Tooltip} from "recharts";
const dashboard = () => {

    const actualizarEstadosCl = async () => {
            try {
                 await actualizarClienteEstado();
            }   
            catch (error) {
                console.error("Error al actulizar estados del clinte:", error);
            }
        };
        useEffect(() => {
               actualizarEstadosCl();
             }, []);
     const [ultimasAsistencias, setUltimasAsistencias] = useState([]);
    useEffect(() => {
        const fetchUltimasAsistencias = async () => {
            try {
                const asistencias = await getUltimasAsistencias();
               
                setUltimasAsistencias( asistencias);
                console.log("asistencias",ultimasAsistencias.asistencias);
            }   
            catch (error) {
                console.error("Error al obtener las últimas asistencias:", error);
            }
        };
        fetchUltimasAsistencias();
    }, []);
    const [cantidadPlan, setCantidadPlanes] = useState([]);
    useEffect(() => {
        const fetchCantidadPlanes = async () => {
            try {
                const planes = await cantidadPlanes();
                console.log("Cantidad de planes:", planes);
                setCantidadPlanes(planes.planes || []);
            } catch (error) {
                console.error("Error al obtener la cantidad de planes:", error);
            }
        };
        fetchCantidadPlanes();
    }, []);
    const [cantidadCliente, setCantidadClientes] = useState();
    useEffect(() => {
        const fetchCantidadClientes = async () => {
            try {
                const clientes = await cantidadClientes("activo");
                console.log("Cantidad de clientes:", clientes);
                setCantidadClientes(clientes.clientes);
            } catch (error) {
                console.error("Error al obtener la cantidad de clientes:", error);
            }
        };
        fetchCantidadClientes();
    }, []);
    const [cantidadClienteInactiv, setCantidadClientesInac] = useState();
     useEffect(() => {
        const fetchCantidadClientesInac = async () => {
            try {
                const clientes = await cantidadClientes("inactivos");
                console.log("Cantidad de clientes inactivos:", clientes);
                setCantidadClientesInac(clientes.clientes);
            } catch (error) {
                console.error("Error al obtener la cantidad de clientes:", error);
            }
        };
        fetchCantidadClientesInac();
    }, []);

    const [cantidadTotalCl, setCantidadClientesTotal] = useState();
     useEffect(() => {
        const fetchCantidadClientesTotal = async () => {
            try {
                const clientes = await cantidadClientesTotal();
                console.log("Cantidad de clientes total:", clientes);
                setCantidadClientesTotal(clientes.total);
            } catch (error) {
                console.error("Error al obtener la cantidad de clientes:", error);
            }
        };
        fetchCantidadClientesTotal();
    }, []);
            const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
    return (
        <div>
            <Container >
                <Box sx={{backgroundColor: "rgba(131, 217, 121, 0.2)",  border: "2px solid rgba(255, 255, 255, 1)", p:2, boder:"4px solid black", borderRadius:3, mb:3}}>
                   <ListItemIcon  >
                            <DescriptionIcon  />
                        </ListItemIcon>
                    <Typography variant="h7" >
                        Consulta de datos del sistema
                    </Typography>
                     
                </Box>
                <Grid  sx={{display:"flex"}}  >
                   {/*clientes totales*/}  
                     <Grid >
                        <Paper elevation={0} sx={{p:2,m:1, borderRadius: 3, background:"linear-gradient(90deg, #68D89B, #4F9D69)"}}>
                            <Box sx={{mb:4, display:"flex"}}>
                                <Box>
                                 <Typography variant="h8" align="center" sx={{ color: "#fff" }}>
                                     Total de clientes
                                </Typography>
                                <p style={{ color: "#fff", fontSize: "2rem", fontWeight: "bold" }}>
                                {cantidadTotalCl}
                            </p>
                                </Box>
                            <Box>
                        <ListItemIcon sx={{color: "#fff", ml: 5}}>
                            <GroupIcon fontSize="large" />
                        </ListItemIcon>
                            </Box>
                            </Box>
                            <Divider sx={{borderColor: "#fff"}} />
                            <Box>
                        <Typography variant="h9"  align="center" sx={{ color: "#fff", fontSize:"0.8rem" }}>
                           Ultimos por mes: 
                        </Typography>
                            </Box>
                        </Paper>
                     </Grid>
                      {/*Ingresos */}  
                      <Grid sx={{display:"flex"}}  >
                   
                     <Grid >
                        <Paper elevation={0} sx={{p:2,m:1, borderRadius: 3, background:"linear-gradient(90deg, #A1D422, #58633F)"}}>
                            <Box sx={{mb:4, display:"flex"}}>
                                <Box>
                                 <Typography variant="h8" align="center" sx={{ color: "#fff" }}>
                                     Ingresos
                                </Typography>
                                <p style={{ color: "#fff", fontSize: "2rem", fontWeight: "bold" }}>
                                N/N
                            </p>
                                </Box>
                            <Box>
                        <ListItemIcon sx={{color: "#fff", ml: 5}}>
                            <CalculateIcon fontSize="large" />
                        </ListItemIcon>
                            </Box>
                            </Box>
                            <Divider sx={{borderColor: "#fff"}} />
                            <Box>
                        <Typography variant="h9"  align="center" sx={{ color: "#fff", fontSize:"0.8rem" }}>
                           Ultimos por mes: 
                        </Typography>
                            </Box>
                        </Paper>
                     </Grid>
                      </Grid>
                      {/* Clientes activos */}
                     <Grid>
                        <Grid sx={{display:"flex"}}  >
                   
                     <Grid >
                        <Paper elevation={0} sx={{p:2,m:1, borderRadius: 3, background:"linear-gradient(90deg, #474EFF, #59D0FF)"}}>
                            <Box sx={{mb:4, display:"flex"}}>
                                <Box>
                                 <Typography variant="h8" align="center" sx={{ color: "#fff" }}>
                                     Clientes Activos
                                </Typography>
                                <p style={{ color: "#fff", fontSize: "2rem", fontWeight: "bold" }}>
                                 {cantidadCliente}
                            </p>
                                </Box>
                            <Box>
                        <ListItemIcon sx={{color: "#fff", ml: 5}}>
                            <AddReactionIcon fontSize="large" />
                        </ListItemIcon>
                            </Box>
                            </Box>
                            <Divider sx={{borderColor: "#fff"}} />
                            <Box>
                        <Typography variant="h9"  align="center" sx={{ color: "#fff", fontSize:"0.8rem" }}>
                           Ultimos por mes: 
                        </Typography>
                            </Box>
                        </Paper>
                     </Grid>
                      </Grid>
                         
                     </Grid>
                     {/*clientes inactivos */}
                      <Grid>
                        <Grid sx={{display:"flex"}}  >
                   
                     <Grid >
                        <Paper elevation={0} sx={{p:2,m:1, borderRadius: 3, background:"linear-gradient(90deg, #FF0033, #FF5959)"}}>
                            <Box sx={{mb:4, display:"flex"}}>
                                <Box>
                                 <Typography variant="h8" align="center" sx={{ color: "#fff" }}>
                                     Clientes Inactivos
                                </Typography>
                                <p style={{ color: "#fff", fontSize: "2rem", fontWeight: "bold" }}>
                                {cantidadClienteInactiv}
                            </p>
                                </Box>
                            <Box>
                        <ListItemIcon sx={{color: "#fff", ml: 5}}>
                            <SentimentDissatisfiedIcon fontSize="large" />
                        </ListItemIcon>
                            </Box>
                            </Box>
                            <Divider sx={{borderColor: "#fff"}} />
                            <Box>
                        <Typography variant="h9"  align="center" sx={{ color: "#fff", fontSize:"0.8rem" }}>
                           Ultimos por mes: 
                        </Typography>
                            </Box>
                        </Paper>
                     </Grid>
                      </Grid>
                         
                     </Grid>
                </Grid>
                <Grid  container spacing={3} sx={{mt: 3}}>

               <Grid size={{xs:12, md:6}}  > 
                    {/* ultimos ingresos */}
                <Box >
                    <Typography variant="h7"   >
                        Ultimos ingresos de hoy
                    </Typography>
                     <DataGrid
                                    sx={{width:"92%", borderRadius:2}}
                                    rows={ultimasAsistencias.asistencias || []}
                                    getRowId={(row) => row.id_asistencia}
                                    columns={[
                                        { field: 'Cliente', headerName: 'Cliente', width: 150 },
                                        { field: 'Hora', headerName: 'Hora', width: 150 },
                                        { field: 'Estado', headerName: 'Estado', width: 150, renderCell:(params)=>(
                                            <Chip
                                            label={params.value} color={params.value === "Activo" ? "success" : "error"}  size="small" variant="filled"
                                            />
                                        ) },
                                    ]}
                                     hideFooter
                                     slots={{ noRowsOverlay: () => <Typography>No hay datos para mostrar</Typography>}}
                                />
                </Box>
                </Grid>
                <Grid sx={{width:"10px"}} size={{ xs: 12, md: 6 }}> 
                         {/* Cantidad de planes  */}
                         <Typography variant="h7"   >
                        Cantidad de planes
                             </Typography>
                           <PieChart width={300} height={200}>
                                <Pie
                                    data={cantidadPlan || []}
                                    dataKey="cantidad"
                                    nameKey="nombre"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={75}
                                    label
                                >
                                    {cantidadPlan.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                                </PieChart>
                                </Grid>
                                 </Grid>         
                         </Container>
                       </div>
    );  
}
export default dashboard;