import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAuthenticationSuccessAction, setAuthToken } from '../../action/AuthAction'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ open, handleClose }) {
  const [userID, setuserID] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleuserIDChange = (event) => {
    setuserID(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLogin = async (event) => {
    try {
      const token = btoa(`${userID}:${password}`);
      const response = await axios.get('https://localhost:443/api/authenticate', {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      // Überprüfung der Backend-Antwort
      if (response.status === 200) {
        const token = response.headers.authorization.split(' ')[1];
        console.log('Authentication successful. Token: ', token);

        // const isAdmin = response.data.isAdministrator;
        // console.log('setAdmin TEsttttt', isAdmin)

        const tokenParts = response.headers.authorization.split(' ')[1].split('.');
        const payloadPart = JSON.parse(atob(tokenParts[1]));
        const isAdmin = payloadPart.isAdministrator;
        console.log('isAdmin:', isAdmin);
        setIsAdmin(isAdmin)

      
        dispatch(getAuthenticationSuccessAction(token));
        dispatch(setAuthToken(token));
        navigate('/homepage', { state: { isAdmin } });
      } else {
        console.log('Authentication failed.')
        toast.error('Login fehlgeschlagen.', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
    } catch (error) {
      console.log('An error occurred during authentication:', error)
      toast.error('Login fehlgeschlagen.', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
  };

  return (
    <Dialog id="LoginDialog" open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField id="LoginDialogUserIDText" label="userID" value={userID} onChange={handleuserIDChange} fullWidth margin="normal" />
        <TextField id="LoginDialogPasswordText" label="Password" value={password} onChange={handlePasswordChange} fullWidth margin="normal" type="password" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button id="PerformLoginButton" onClick={handleLogin} color="primary">Login</Button>
      </DialogActions>
      <ToastContainer />
    </Dialog>
  );
}

export default Login;
