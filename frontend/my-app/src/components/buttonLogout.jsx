 import {useNavigate} from "react-router-dom";
 import {logout} from "../services/authLogout";
 
 const buttonLogout =  () => {

 const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };
    return (
        <button onClick={handleLogout}>Logout</button>
    )
}
export default buttonLogout;