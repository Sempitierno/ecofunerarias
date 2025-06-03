import type React from "react"
import {List, ListItem, ListItemText, ListItemButton} from '@mui/material';

const Sidebar = () =>{
  return (
    <div style={{width: '240px', height:'100vh', backgroundColor:'#282c34'}}> 
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Funerarias" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
          <ListItemText primary="Métodos" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;

