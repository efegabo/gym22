import getClientes from "../../services/gestionUser/getCliente";
 import { Typography} from "@mui/material";
import QrModal from "../../components/user/qrModal";
import QrCliente from "../../services/gestionUser/qrClient";
import { DataGrid } from '@mui/x-data-grid';  
import {Button} from "@mui/material";

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
            const qrCode = await QrCliente(id_usuario);
               console.log(qrCode);
            setQr(qrCode); // qrClient ya devuelve solo el código QR
            setOpen(true);
        }
        catch (error) {
            console.error("Error al obtener el código QR del cliente:", error);
        }
    };
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
        <div>
           <Typography variant="h5" mb={3} align="center" >
           Clientes
          </Typography>
            <DataGrid
                sx={{width:"80%",  mx:"auto"}}
                rows={clientes}
                  getRowId={(row) => row.id_usuario}
                columns={[
                    { field: 'id_usuario', headerName: 'ID', width: 100 },
                    { field: 'nombre', headerName: 'Nombre', width: 200 },
                    { field: 'apellido', headerName: 'Apellido', width: 200 },
                    { field: 'telefono', headerName: 'Teléfono', width: 200 },
                    { field: 'qr', headerName:'Qr del usuario', width:100, 
                        renderCell:(params)=>( 
                        <Button
                            
                        onClick={() => abrirModal(params.row.id_usuario)} >
                            Ver qr
                          </Button>
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

            
        </div>
    );
}   
export default usuarios;