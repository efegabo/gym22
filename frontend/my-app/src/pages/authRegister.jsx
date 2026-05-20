import Input from "../components/input";
import Button from "../components/button";
function AuthRegister() {
    return (
        <div className="auth"> 
            <h2>Registro de Usuario</h2>   
            <form>
                <Input name="nombre_gym" type="text" placeholder="Nombre del Gym" />
                <Input name="name" type="text" placeholder="Nombre del Usuario" />
                <Input name="email" type="email" placeholder="Correo Electrónico" />
                <Input name="password" type="password" placeholder="Contraseña" />
                <Button text="Registrar" />
            </form>
        </div>
    )
}
export default AuthRegister;