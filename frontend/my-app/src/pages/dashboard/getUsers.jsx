import {getClientes, deleteCliente, actualizarClienteEstado} from "../../services/gestionUser/getCliente";
 import { Typography, Chip} from "@mui/material";
import QrModal from "../../components/user/qrModal";
import {qrClient} from "../../services/gestionUser/qrClient";
import { DataGrid } from '@mui/x-data-grid';  
import {Button, Grid, Box} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { useState, useEffect } from "react";
const usuarios =()=>{
    //ESTADO PARA GUARDAR LOS CLIENTES Y EL QR
    const [clientes, setClientes] = useState([]);
    const [open, setOpen] = useState(false);
    const [qr, setQr] = useState("");
    const handleOpen = () => setOpen(true);
    /*function handleOpen (){
        setOpen(true)
    }*/
   
    const handleClose = () => setOpen(false);

    
     const fetchClientes = async () => {
            try {
                const cargarClientes = await getClientes();
                setClientes(cargarClientes);
            }
            catch (error) {
                console.error("Error al obtener los clientes:", error);
            }
        };
       useEffect(() => {
               fetchClientes();
    }, []);

    /*const [mostrarModal, setMostrarModal] = useState(false);
    const abrirModal = async (id_usuario) => {
          console.log("Click en cliente:", id_usuario); // Verificar que se recibe el ID del cliente
        try {
            const qrCode = await QrCliente(id_usuario);
               console.log(qrCode);
            setQr(qrCode); // qrClient ya devuelve solo el código QR
            setMostrarModal(true);
        }
        catch (error) {
            console.error("Error al obtener el código QR del cliente:", error);
        }
    };*/
    const abrirModal = async (id_usuario) => {
          console.log("Click en cliente:", id_usuario); // Verificar que se recibe el ID del cliente
        try {
            const qrCode = await qrClient(id_usuario);
               console.log(qrCode);
            setQr(qrCode); // qrClient ya devuelve solo el código QR
            setOpen(true);
        }
        catch (error) {
            console.error("Error al obtener el código QR del cliente:", error);
        }
    };
    const eliminarUsuario =async (id_usuario)=>{
        try{
            await deleteCliente(id_usuario)
            console.log("usuario eliminado")
        }catch(error){
            console.error("Error al obtener el código QR del cliente:", error);
        }
    }
     
    return (
        /*
        <div>
            <h1>Clientes</h1>
            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.id_usuario}>{cliente.nombre} {cliente.apellido} {cliente.telefono}
                     <Button
                      text="Ver QR"
                        onClick={() => abrirModal(cliente.id_usuario)}
                             />
                     </li>
                    
                ))}
            </ul>
            {mostrarModal && 
            <QrModal onClose={() => setMostrarModal(false)} qrCode={qr} />}
        </div>*/
       <Grid size={{xs:12, md:12}}  >
        <Box sx={{width:"100%", mt:5, mb:5}} >
            <Box sx={{mb:3,  }} >
                <Typography variant="h5" align="left" sx={{mb:2}} >
           Clientes
          </Typography>
          <Typography variant="body2" align="left"> 
          En esta sección puedes ver todos los clientes registrados en el sistema, así como sus datos de contacto y su código QR.
          </Typography>
                </Box> 
            
            <DataGrid
                sx={{width:"98%",  mx:"auto",  '& .MuiDataGrid-columnHeaderTitle': {fontWeight: 'bold', color: '#4A4A4A',},}}
                rows={clientes}
                  getRowId={(row) => row.id_usuario}
                columns={[
                    { field: 'id_usuario', headerName: 'ID', width: 100,headerAlign: 'center', align: 'center' },   
                    { field: 'nombre', headerName: 'Nombre', width: 100,headerAlign: 'center', align: 'center' },
                    { field: 'apellido', headerName: 'Apellido', width: 100,headerAlign: 'center', align: 'center' },
                    { field: 'telefono', headerName: 'Teléfono', width: 150,headerAlign: 'center', align: 'center' },
                     { field: 'estado', headerName: 'estado', width: 150,headerAlign: 'center', align: 'center', renderCell:(params)=>(
                                            <Chip
                                            label={params.value} color={params.value === "Activo" ? "success" : "error"}  size="small" variant="filled"
                                            />) },
                    { field: 'qr', headerName:'Qr del usuario', width:150, align: 'center', headerAlign: 'center',
                        renderCell:(params)=>( 
                        <Button 
                        onClick={() => abrirModal(params.row.id_usuario)} >
                            Ver qr
                          </Button>
                            )
                    },
                    { field: 'Eliminar', headerName: 'Accion', width: 180,headerAlign: 'center', align: 'center',
                        renderCell:(params)=>(
                            <Box sx={{ display: 'flex',   }}>
      
                                <Button
                                    onClick={() => eliminarUsuario(params.row.id_usuario)}
                                >
                                    <DeleteIcon  sx={{ color: '#E8573A' }} />
                                </Button>

                                <Button
                                    onClick={() => editarUsuario(params.row.id_usuario)}
                                >
                                    <EditSquareIcon sx={{ color: '#4F9D69' }} />
                                </Button>

                                </Box>
                        )
                     }

                ]}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
            <QrModal
                open={open}
                onClose={() => setOpen(false)}
                qr={qr}
                />

            </Box>
         </Grid>
    );
}   
export default usuarios;