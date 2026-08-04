 
import ButtonLogout from "../../components/buttonLogout";
import QrCliente from "../../services/gestionUser/qrClient";
import {getClienteId} from "../../services/gestionUser/getCliente";
import { useState, useEffect } from "react";
import Navbar from '../../components/mobile/navbar'
import { Box, Typography, Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import WindowIcon from '@mui/icons-material/Window';
 import DownloadIcon from '@mui/icons-material/Download';
   import ListItemIcon from '@mui/material/ListItemIcon';
const menuCliente = ()=>{

   const [cliente,setUsuario]= useState(null)
    const usuarioId =async ()=>{
        const cargarUsuario= await getClienteId()
        console.log("usuaario",cargarUsuario)
        setUsuario(cargarUsuario.usuario)
     
    }
    useEffect(() => {
               usuarioId();
    }, []);
    const [qr, setQr] = useState(null);
     const [loanding, setLoanding] = useState(true);
    const qrs = async (id_usuario)=>{
        const qrMostrar = await QrCliente(id_usuario)
          setQr(qrMostrar)
          setLoanding(false)                
    }

    useEffect(() => {
               qrs();
    }, []);
    if(loanding) return <p>Cargando qr</p>

     
    return(
        <div>
            <Box sx={{height:"100vh", display:"flex", flexDirection:"column"}}>
                 <WindowIcon fontSize="large" sx={{m:5, color:"#757575"}} />
                <Box sx={{flex:8,  display: "flex",flexDirection:"column", justifyContent: "center",  alignItems: "center"}}>
                       
                    <Box sx={{width:"80%",maxWidth: 500,mx:"auto", borderRadius:2,p: 3, background: "linear-gradient(90deg, #68D89B, #4F9D69)", position: "relative"}}>
                           
                             {cliente.map((usur)=>(
                    <Box key={usur.id_usuario} sx={{mt:6}}>
                        <Box sx={{ display:"flex", justifyContent:"center", mt: -5}}>
                           <Avatar src={`https://api.dicebear.com/10.x/adventurer/svg?seed=${usur.id_usuario}`} sx={{width:110, height:110, borderRadius: "50%",border: "4px solid #4F9D69",  position: "absolute",  top: -60,bgcolor: "white"}} />          
                        </Box>           
                     <Typography
                       
                        variant="h5"
                        fontWeight="bold"
                        mb={2}
                        sx={{textAlign:"center", m:3}}
                        >
                        {usur.nombre }
                        {usur.apellido}
                        </Typography>
                        </Box> 
                        ))} 
                             
                         

                    {qr && (
                        <Box sx={{ display: "flex", justifyContent:"center"}}>
                            <Box component="img" src={qr}  alt="QR" sx={{ width:"70%", maxWidth:200, height:"auto", mb:2}}  />
                        </Box>
                     
                    )}
                         
                    </Box>
                     <Box sx={{width:"80%", mt:5}}>
                        <Button
                        sx={{
                            backgroundColor: "#68D89B",  color: "#757575", fontWeight:"bold",p:1.5, borderRadius:2, width:"100%", ":hover": { backgroundColor: "#4F9D69" }, fontSize:"20px" 
                             }}
                        >
                                DESCARGAR
                                 <ListItemIcon  >
                                        <DownloadIcon fontSize="large" />
                                 </ListItemIcon>
                            </Button>
                        </Box>   
                </Box>
                  
                <Box>
                        <Navbar />
                </Box>
            </Box>
        </div>
    )
}
export default menuCliente; 