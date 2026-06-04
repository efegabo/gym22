const qrModal = ({onClose, qrCode }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Código QR del Cliente</h2>
                <img src={qrCode} alt="Código QR del Cliente" />
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}   
export default qrModal;