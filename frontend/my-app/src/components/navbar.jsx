import {
    Box,
    Container,
    Paper,
    Grid,
    Button,
    Typography,
} from "@mui/material";
import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
 
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {logout} from "../services/authLogout";
import {useNavigate} from "react-router-dom";
 import ListItemIcon from '@mui/material/ListItemIcon';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
function navbar( {text}) {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function fechaActual (){
                const fecha = new Date();
                const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                return fechaFormateada;
            }
    return (
        <div>
            <Box sx={{ width: "100%", height: "10vh", display:{ xs: "none", sm: "block"}}}>
                <React.Fragment>
                    <Box sx={{
                        
                        height: "10vh",
                        backgroundColor: "#F0F0F0",
                        display: "flex",
                        justifyContent: "space-between", 
                        alignItems: "center",
                        pr: 2
                    }}>
                        <Box sx={{ display: "flex", alignItems: "center", ml: 4, }}>
                              <Typography variant="body1"  >
                                    ¡Hola! Bienvenido 
                                       
                                </Typography><ListItemIcon sx={{color: "#4F9D69"}}> <FaceRetouchingNaturalIcon /> </ListItemIcon>
                                <Typography variant="body2"  >
                                     
                                      {fechaActual()}
                                </Typography>
                        </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}> 
                         
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open}
                            >
                                <Avatar src="/public/avatar.png" />
                            </IconButton>
                        </Tooltip>
                        </Box>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                            <Avatar /> Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Avatar /> My account
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add another account
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </React.Fragment>

            </Box>
        </div>
    )
}

export default navbar;

