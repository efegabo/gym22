 import {useNavigate} from "react-router-dom";
 import {logout} from "../services/authLogout";
 import Button from '@mui/material/Button';

 
 const buttonLogout =  () => {

 const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };
    return (
        <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
        </Button>
    )
}
export default buttonLogout;