import { Modal, Box, Typography } from "@mui/material";
const qrModal = ({ open, onClose, qr }) => {

        const style = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            
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
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          QR del Usuario
        </Typography>

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
    </Modal>
    );
}   
export default qrModal;