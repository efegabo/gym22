import Sidebar from "../../components/sidebar";
import {Grid, Container, Box} from "@mui/material";
import Navbar from "../../components/navbar"
const AdminLayout = ({ children }) => {
    return (
        <div>
            
            <Navbar />
             <Box sx={{ display: "flex", minHeight: "100vh"}}>
                        <Sidebar />
                        <Box sx={{flexGrow: 1, p: 3}}> 
                          {children}
                        </Box>
                          </Box>
        </div>
    );
}
export default AdminLayout;