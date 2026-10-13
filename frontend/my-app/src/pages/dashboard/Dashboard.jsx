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
import { getUltimasAsistencias, cantidadPlanes, cantidadClientes,
     cantidadClientesTotal, actualizarClienteEstado, horasEstadisticas} from "../../services/gestionUser/getCliente";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart,XAxis ,Bar, CartesianGrid  } from "recharts";
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

                setUltimasAsistencias(asistencias);
                console.log("asistencias", ultimasAsistencias.asistencias);
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

   
    const [horas, setHorasEstadisticas] = useState([]);
    useEffect(() => {
        const fetchHorasEstadisticas = async () => {
            try {
                const estadisticas = await horasEstadisticas();
                console.log("Estadisticas de horas:", estadisticas);
                setHorasEstadisticas(estadisticas.estadisticas || []);
            }
            catch (error) {
                console.error("Error al obtener las estadisticas de horas:", error);
            }  
        };
        fetchHorasEstadisticas();
    }, []);
      const horass = [
        "06:00", "07:00", "08:00", "09:00",
        "10:00", "11:00", "12:00", "13:00",
        "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00", "21:00"
        ];
        const datosGrafico =horass.map((hours)=>{
            const convHoraNumero = Number(hours.substring(0,2)) //toma los dos primeros caracteres
            const coincidenciaHoras =  horas.find((item)=>Number(item.hora)=== convHoraNumero)
            return {
                hours, Cantidad:coincidenciaHoras ? coincidenciaHoras.Cantidad : 0
            }
        })
         
    return (
        <div>
            <Container>
                <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                    Dashboard

                </Typography>
                <Grid
                    container
                    spacing={2}
                    alignItems="stretch"
                >
                    {/* Total clientes */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                backgroundColor: "#4F9D69",
                                height: "100%",
                                boxSizing: "border-box"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "#fff" }}
                                    >
                                        Total de clientes
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#fff",
                                            fontSize: "2.5rem",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {cantidadTotalCl}
                                    </Typography>
                                </Box>

                                <GroupIcon
                                    sx={{
                                        color: "#fff",
                                        fontSize: 40
                                    }}
                                />
                            </Box>

                            <Divider
                                sx={{
                                    my: 2,
                                    borderColor: "#fff"
                                }}
                            />

                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#fff",
                                    fontSize: "0.7rem"
                                }}
                            >
                                Últimos por mes:
                            </Typography>
                        </Paper>
                    </Grid>


                    {/* Ingresos */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                border: "1px solid #D1D0CF",
                                backgroundColor: "#fff",
                                height: "100%",
                                boxSizing: "border-box"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "#7A7A7A" }}
                                    >
                                        Ingresos
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#7A7A7A",
                                            fontSize: "2.5rem",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        N/N
                                    </Typography>
                                </Box>

                                <CalculateIcon
                                    sx={{
                                        color: "#4F9D69",
                                        fontSize: 40
                                    }}
                                />
                            </Box>

                            <Divider
                                sx={{
                                    my: 2,
                                    borderColor: "#7A7A7A"
                                }}
                            />

                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#7A7A7A",
                                    fontSize: "0.7rem"
                                }}
                            >
                                Últimos por mes:
                            </Typography>
                        </Paper>
                    </Grid>


                    {/* Clientes activos */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                border: "1px solid #D1D0CF",
                                backgroundColor: "#fff",
                                height: "100%",
                                boxSizing: "border-box"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "#7A7A7A" }}
                                    >
                                        Clientes activos
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#7A7A7A",
                                            fontSize: "2.5rem",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {cantidadCliente}
                                    </Typography>
                                </Box>

                                <AddReactionIcon
                                    sx={{
                                        color: "#4F9D69",
                                        fontSize: 40
                                    }}
                                />
                            </Box>

                            <Divider
                                sx={{
                                    my: 2,
                                    borderColor: "#7A7A7A"
                                }}
                            />

                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#7A7A7A",
                                    fontSize: "0.7rem"
                                }}
                            >
                                Últimos por mes:
                            </Typography>
                        </Paper>
                    </Grid>


                    {/* Clientes inactivos */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                border: "1px solid #D1D0CF",
                                backgroundColor: "#fff",
                                height: "100%",
                                boxSizing: "border-box"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "#7A7A7A" }}
                                    >
                                        Clientes inactivos
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#7A7A7A",
                                            fontSize: "2.5rem",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {cantidadClienteInactiv}
                                    </Typography>
                                </Box>

                                <SentimentDissatisfiedIcon
                                    sx={{
                                        color: "#4F9D69",
                                        fontSize: 40
                                    }}
                                />
                            </Box>

                            <Divider
                                sx={{
                                    my: 2,
                                    borderColor: "#7A7A7A"
                                }}
                            />

                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#7A7A7A",
                                    fontSize: "0.7rem"
                                }}
                            >
                                Últimos por mes:
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ mt: 3 }}>

                    <Grid size={{ xs: 12, md: 6 }}  >
                        {/* ultimos ingresos */}
                        <Box sx={{ backgroundColor: "#fff", borderRadius: 2, p: 2 }} >
                            <Typography variant="body2" sx={{ pb: 2 }} >
                                Ultimos ingresos de hoy
                            </Typography>

                            <DataGrid
                                sx={{ width: "100%", borderRadius: 2 }}
                                rows={ultimasAsistencias.asistencias || []}
                                getRowId={(row) => row.id_asistencia}
                                columns={[
                                    { field: 'Cliente', headerName: 'Cliente', width: 150 },
                                    { field: 'Hora', headerName: 'Hora', width: 150 },
                                    {
                                        field: 'Estado', headerName: 'Estado', width: 150, renderCell: (params) => (
                                            <Chip
                                                label={params.value} color={params.value === "Activo" ? "success" : "error"} size="small" variant="filled"
                                            />
                                        )
                                    },
                                ]}
                                hideFooter
                                slots={{ noRowsOverlay: () => <Typography>No hay datos para mostrar</Typography> }}
                            />
                        </Box>
                    </Grid>
                    <Grid sx={{ width: "10px" }} size={{ xs: 12, md: 6 }}>
                        {/* Cantidad de planes  */}
                        <Box sx={{ backgroundColor: "#fff", borderRadius: 2, p: 2 }} >
                            <Typography variant="body2" sx={{ pb: 2 }}  >
                                Cantidad de planes
                            </Typography>
                            <PieChart width={350} height={250}>
                                <Pie
                                    data={cantidadPlan || []}
                                    dataKey="cantidad"
                                    nameKey="nombre"
                                    cx="50%"
                                    cy="43%"
                                    innerRadius={50}
                                    outerRadius={90}

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
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }}>
                        {/* estadiscas de ingreso por horas */}
                        <Box sx={{ backgroundColor: "#fff", borderRadius: 2, p: 2 }} >
                            <Typography variant="body2" sx={{ pb: 2 }}  >
                                 Estadisticas de ingreso por horas
                            </Typography>
                            <BarChart width={"100%"} height={250} data={datosGrafico}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hours" />
                                <Tooltip />
                              
                                <Bar dataKey="Cantidad" fill="#8884d8" />
                            </BarChart>
                        </Box>
                    </Grid>

                </Grid>


            </Container>
        </div>
    );
}
export default dashboard;