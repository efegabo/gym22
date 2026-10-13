import { useState } from "react";
import { Box, Button, Container, Dialog } from "@mui/material";
import {BarcodeScanner} from "../../components/qrLector"
import Typography from "@mui/material/Typography";
 
const Escanear = () => {
    const [escanear, setEscanear] = useState(false)
     
    return (
        <div>
            <Container>
                <Box sx={{textAlign:"center"}}>
                <Typography variant="h4" sx={{mb:2}} >
                       Escanea el Qr <br/> de tus clientes aquí.
                </Typography>
             <Typography variant="body2"sx={{mb:2}} >
                       Recuerda que para poder escanear el Qr de tus clientes <br/> debes tener la cámara de tu dispositivo habilitada.
              </Typography>
              <img src="../../../public/qrEj.png" alt="qr" style={{width:"150px", height:"150px", marginBottom:"20px"}} />
            
             <Button variant="contained" onClick={()=>setEscanear(true)} sx={{display:"block", mx:"auto", backgroundColor: "#4F9D69"}} >
                            escanear qr
             </Button>
              <Dialog open={escanear} onClose={()=>setEscanear(false)} maxWidth="sm" fullWidth>
                            <BarcodeScanner onClose={()=>setEscanear(false)} />
             </Dialog>
                </Box>
                 
            </Container>
              
        </div>
    );
};

export default Escanear;