import Sidebar from "../../components/sidebar";
import {Grid, Container, Box} from "@mui/material";
import Navbar from "../../components/navbar"
import dashboard from "../../pages/dashboard/Dashboard";
const AdminLayout = ({ children }) => {
    return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Navbar text="Dashboard" />

        <Box sx={{ flexGrow: 1, p: 3, bgcolor: "#F0F0F0" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
export default AdminLayout;