import { useState } from "react";
import { Button, Dialog } from "@mui/material";
import {BarcodeScanner} from "../../components/qrLector"
import Typography from "@mui/material/Typography";
 
const Escanear = () => {
    const [escanear, setEscanear] = useState(false)
     
    return (
        <div>
             <Typography variant="h4" >
                       Escanear QR
                </Typography>
             <Typography variant="h7" >
                       Esta es la página de escaneo de códigos QR.
                </Typography>
            
             <Button variant="contained" onClick={()=>setEscanear(true)} >
                            escanear qr
             </Button>
                        <Dialog open={escanear} onClose={()=>setEscanear(false)} maxWidth="sm" fullWidth>
                            <BarcodeScanner onClose={()=>setEscanear(false)} />
                        </Dialog>
        </div>
    );
};

export default Escanear;