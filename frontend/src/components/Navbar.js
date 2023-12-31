import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#26223f' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Testflow Analysis Dashboard
        </Typography>
        {/* Add other navbar items here */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;