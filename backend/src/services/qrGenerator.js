import Qrcode from 'qrcode';
const generateQrCode =async (codigoQr) => {
    try {
    return await Qrcode.toDataURL(codigoQr);
        
    } catch (error) {
        console.error('Error al generar el código QR:', error);
        throw error;
    }
};

export default generateQrCode;