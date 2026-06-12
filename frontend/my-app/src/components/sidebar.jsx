import {Drawer, List, ListItem, ListItemButton, ListItemText,
    Collapse, IconButton} from "@mui/material";
    import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink} from "react-router-dom";
import * as React from 'react';
 
export default function Sidebar() {
     
    const [openMenu, setOpenMenu] = React.useState("");
   
  const handleMenu = (menu) => {
  setOpenMenu(openMenu === menu ? "" : menu);
};
 
         
              const drawerContent = (
                <List sx={{ backgroundColor: "#292625" , height: "100vh", color: "#fff" }}>
                     <ListItem disablePadding sx={{borderBlockEnd: "1px solid #ccc"}}>
                          <ListItemText primary="Gym" align="center"  />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={NavLink} to="/dashboard">
                           <ListItemText primary="Dashboard"   />
                        </ListItemButton>
                    </ListItem>
                     <ListItemButton onClick={() => handleMenu("usuarios")}>
                        <ListItemText primary="Usuarios" />
                        {openMenu === "usuarios" ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                       <Collapse in={openMenu === "usuarios"} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{pl: 7}}  component={NavLink} to="/getUsers">
                            <ListItemText primary="Ver usuarios" />
                            </ListItemButton>
                             <ListItemButton sx={{pl: 7}} component={NavLink} to="/users">
                            <ListItemText primary="Gestionar Usuarios" />
                            </ListItemButton>  
                           </List>
                       </Collapse>

                        <ListItemButton onClick={() => handleMenu("planes")}>
                        <ListItemText primary="Planes" />
                        {openMenu === "planes" ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                       <Collapse in={openMenu === "planes"} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{pl: 7}}  component={NavLink} to="/planes">
                            <ListItemText primary="Gestionar Planes" />
                            </ListItemButton>
                             <ListItemButton sx={{pl: 7}} component={NavLink} to="/planes">
                            <ListItemText primary="Ver Planes" />
                            </ListItemButton>  
                           </List>
                       </Collapse>

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