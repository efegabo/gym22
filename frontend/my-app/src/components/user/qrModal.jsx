import { Modal, Box, Typography,ListItem,ListItemText  } from "@mui/material";
import List from '@mui/material/List';
const qrModal = ({ open, onClose, qr }) => {

        const style = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            display:"flex",
            borderRadius: 2,
            p: 4,
            };
    return (
       /* <div className="modal-overlay">
            <div className="modal-content">
                <h2>Código QR del Cliente</h2>
                <img src={qrCode} alt="Código QR del Cliente" />
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>*/
         <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
    >
        
      <Box sx={style} >
         <Box> 
        

        {qr && (
          <img
            src={qr}
            alt="QR"
            display={{
              width: "50%",
               
            }}
            
          />
        )}
          
        </Box>
           <Box> 
             <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                gutterBottom
                >
         Datos del usuario
        </Typography>
       
            <List >                      
              
                <ListItem>
                  <ListItemText
                  primary="Correo:" 
                  />
                  <ListItemText
                  primary="sexo:" 
                  />
                </ListItem>
                
              
            </List>
        
             </Box>
      </Box>
    </Modal>
    );
}   
export default qrModal;