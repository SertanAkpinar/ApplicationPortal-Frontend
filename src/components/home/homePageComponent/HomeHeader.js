import React from 'react';
import { AppBar, Button, Box, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { clearAuthenticationAction } from '../../../action/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Themes } from '../../../themes/Themes'

function HomeHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authToken = useSelector((state) => state.authToken);
  //console.log('Current auth token:', authToken);

  const handleLogout = () => {
    dispatch(clearAuthenticationAction()); // Token löschen
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar id="appbar" position="sticky" className="transparent-appbar" sx={{ color: Themes.transparentStyle }}>
        <Toolbar>
          <IconButton size="large" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, mr: 2 }}>
            Homepage
          </Typography>
          <Button id="LogoutButton" color="inherit" variant="outlined" onClick={handleLogout}>
            <Typography variant="h4">Logout</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HomeHeader;
