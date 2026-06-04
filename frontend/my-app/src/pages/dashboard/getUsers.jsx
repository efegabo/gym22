import getClientes from "../../services/gestionUser/getCliente";
import Button from "../../components/button";
import QrModal from "../../components/user/qrModal";
import QrCliente from "../../services/gestionUser/qrClient";
import { useState, useEffect } from "react";
const usuarios =()=>{
    
    const [clientes, setClientes] = useState([]);
    const [qr, setQr] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    

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
    };
   
    return (
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
        </div>
    );
}   
export default usuarios;