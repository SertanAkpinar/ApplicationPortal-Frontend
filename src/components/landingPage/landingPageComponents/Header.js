import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Login from '../../login/Login';
import { Themes } from '../../../themes/Themes'

function Header() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar id="appbar" position="sticky" className="transparent-appbar" sx={{ color: Themes.transparentStyle }}>
        <Toolbar>
          <IconButton size="large" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, mr: 2 }}>
            Landing Page
          </Typography>
          <Button id="OpenLoginDialogButton" color="inherit" variant="outlined" onClick={handleOpen}>
            <Typography variant="h4">
              Login
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Login open={open} handleClose={handleClose} />
    </Box>
  );
}

export default Header;
