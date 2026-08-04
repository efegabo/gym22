import {Drawer, List, ListItem, ListItemButton, ListItemText,
    Collapse, IconButton} from "@mui/material";
    import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink} from "react-router-dom";
import * as React from 'react';
 import DashboardIcon from '@mui/icons-material/Dashboard';
 import ListItemIcon from '@mui/material/ListItemIcon';
 import FaceIcon from '@mui/icons-material/Face';
 import ArrowRightIcon from '@mui/icons-material/ArrowRight';
 import ArticleIcon from '@mui/icons-material/Article';
 import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
 import QrCodeIcon from '@mui/icons-material/QrCode';
export default function Sidebar() {
     
    const [openMenu, setOpenMenu] = React.useState("");
   
  const handleMenu = (menu) => {
  setOpenMenu(openMenu === menu ? "" : menu);
};
 
         
              const drawerContent = (
                <List sx={{ backgroundColor: "#fff" , height: "100vh", color: "#4A4A4A"}}>
                     <ListItem disablePadding sx={{p:2}}>
                          <ListItemText primary="InPass" align="center"   />
                          <ListItemIcon sx={{color: "#4F9D69"}}>
                            <QrCodeIcon />
                            </ListItemIcon>
                    </ListItem>
                    <ListItem disablePadding >
                         
                        <ListItemButton component={NavLink} to="/dashboard" sx={{"&:hover":{ borderLeft: "5px solid #68D89B", color: "#4F9D69"}, "&.active":{ borderLeft: "5px solid #68D89B", color: "#4F9D69"}}}>
                        <ListItemIcon sx={{color: "#4F9D69"}}>
                            <DashboardIcon />
                        </ListItemIcon>
                           <ListItemText primary="Dashboard"   />
                        </ListItemButton>
                    </ListItem>
                     <ListItemButton onClick={() => handleMenu("usuarios") } sx={{"&:hover":{ borderLeft: "5px solid #68D89B"}}  }>
                        <ListItemIcon sx={{color: "#4F9D69"}}>
                            <FaceIcon />
                        </ListItemIcon>
                        <ListItemText primary="Usuarios" />
                        {openMenu === "usuarios" ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                       <Collapse in={openMenu === "usuarios"} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{pl: 3}}  component={NavLink} to="/getUsers" sx={{"&:hover":{ borderLeft: "5px solid #68D89B", color: "#4F9D69"}, "&.active":{ borderLeft: "5px solid #68D89B", color: "#4F9D69"}} } >
                             <ListItemIcon sx={{color: "#4F9D69"}}>
                            <ArrowRightIcon />
                              </ListItemIcon>
                            <ListItemText primary="Ver usuarios" />
                            </ListItemButton>
                             
                             <ListItemButton sx={{pl: 3}} component={NavLink} to="/users" sx={{"&:hover":{ borderLeft: "5px solid #68D89B", color: "#4F9D69"}, "&.active":{ borderLeft: "5px solid #68D89B", color: "#4F9D69"}} }> 
                            <ListItemIcon sx={{color: "#4F9D69"}}>
                            <ArrowRightIcon />
                        </ListItemIcon>
                            <ListItemText primary="Gestionar Usuarios" />
                            </ListItemButton>  
                           </List>
                       </Collapse>

                        <ListItemButton onClick={() => handleMenu("planes")} sx={{"&:hover":{ borderLeft: "5px solid #68D89B"}}}>
                            <ListItemIcon sx={{color: "#4F9D69"}}>
                                <ArticleIcon />
                            </ListItemIcon>
                        <ListItemText primary="Planes" />
                        {openMenu === "planes" ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                       <Collapse in={openMenu === "planes"} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{pl: 3}}  component={NavLink} to="/planes" sx={{"&:hover":{ borderLeft: "5px solid #68D89B", color: "#4F9D69"}, "&.active":{ borderLeft: "5px solid #68D89B", color: "#4F9D69"}} } >
                                 <ListItemIcon>
                            <ArrowRightIcon />
                              </ListItemIcon>
                            <ListItemText primary="Gestionar Planes" />
                            </ListItemButton>
                             <ListItemButton sx={{pl: 3}} component={NavLink} to="/planes" sx={{"&:hover":{ borderLeft: "5px solid #68D89B", color: "#4F9D69"}, "&.active":{ borderLeft: "5px solid #68D89B", color: "#4F9D69"}} }>
                              <ListItemIcon>
                            <ArrowRightIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ver Planes" />
                            </ListItemButton> 
                             
                           </List>
                       </Collapse>
                        <ListItemButton sx={{pl: 3}} component={NavLink} to="/escanear" sx={{"&:hover":{ borderLeft: "5px solid #68D89B", color: "#4F9D69"}, "&.active":{ borderLeft: "5px solid #68D89B", color: "#4F9D69"}} }>
                              <ListItemIcon sx={{color: "#4F9D69"}}>
                            <CenterFocusStrongIcon />
                            </ListItemIcon>
                            <ListItemText primary="Escanear" />
                            </ListItemButton>  

                </List>)
                const [mobileOpen, setMobileOpen] = React.useState(false);
                
                    return (
                        <div>
                            {/* Botón para abrir el Drawer en dispositivos móviles */}
                            {/*si es falso se muestra el botón */}
                            {!mobileOpen && (
                                <IconButton
                                  onClick={() => setMobileOpen(true)}
                                  sx={{ display: { xs:"block", sm: 'none', md: 'none' } ,
                                    top: 10,
                                    left: 10,
                                     zIndex: 1300,
                                }}
                                >
                                <MenuIcon />
                                </IconButton>
                            )}
                            {/* Drawer para dispositivos móviles */}
                        <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={() => setMobileOpen(false)}
                        sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                          width: 240,
                          boxSizing: "border-box",
                            },
                             }}
                        >
                            {drawerContent}
                        </Drawer>
                        {/* Drawer para dispositivos de escritorio */}
                        <Drawer
                        variant="permanent"
                         sx={{
                             
                         display: { xs: "none", md: "block" },
                            width: 240,
                        flexShrink: 0,
                            "& .MuiDrawer-paper": {
                             width: 240,
                         boxSizing: "border-box",
                                     },
                                     
                                  }}
                        >
                            {drawerContent}
                            </Drawer>
                        </div>
     
                     );
}