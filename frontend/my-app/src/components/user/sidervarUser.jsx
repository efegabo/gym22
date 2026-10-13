import {Drawer, List, ListItem, ListItemButton, ListItemText,
    Collapse, IconButton} from "@mui/material";
     import ListItemIcon from '@mui/material/ListItemIcon';
    import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
    import SettingsIcon from '@mui/icons-material/Settings';
export default function SidevarUser(){
    return (
    <> 
    
    <List   >
        <ListItemButton sx={{"&:hover":{ borderLeft: "5px solid #68D89B", color: "#4F9D69"}}}>
            <ListItemIcon sx={{color: "#4F9D69"}}>
                            <ContactEmergencyIcon />
            </ListItemIcon>
            <ListItemText  primary="Informacion General"   />
        </ListItemButton  >
        <ListItemButton sx={{"&:hover":{ borderLeft: "5px solid #68D89B", color: "#4F9D69"}}}>
            <ListItemIcon sx={{color: "#4F9D69"}}>
                            <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setting"   />
        </ListItemButton>
    </List>
    </>
    )
}