import * as React from 'react'; 
 import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import DataExplorationIcon from '@mui/icons-material/DataExploration';
import {NavLink} from "react-router-dom";
function nabvarMobile(){
     const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return(
        <div>
            <Tabs
  value={value}
  onChange={handleChange}
  variant="fullWidth"
  sx={{
    "& .MuiTab-root": {
      color: "#757575", // Color cuando NO está seleccionado
      transition: "0.3s",
    },
    "& .Mui-selected": {
      color: "#4F9D69 !important", // Color del tab seleccionado
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#4F9D69", // Color de la línea inferior
    },
  }}
>
  <Tab icon={<HomeFilledIcon />} label="HOME" component={NavLink} to="/mainClient" />
  <Tab icon={<DataExplorationIcon />} label="ESTADISTICAS"  component={NavLink} to="/estadisticas" />
  <Tab icon={<PersonPinIcon />} label="PROFILE" />
</Tabs> 
        </div>
    )
}
export default nabvarMobile