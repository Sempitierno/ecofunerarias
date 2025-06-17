import React from "react";
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className="gb-green-500"> Admin Dashboard</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;