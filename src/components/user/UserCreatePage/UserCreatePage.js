import { Typography, Box, TextField, Button, Select, MenuItem } from '@mui/material';
import UserCreateHeader from './UserCreatePagecomponents/UserCreateHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Themes } from '../../../themes/Themes'

function UserCreatePage() {
    const authToken = useSelector((state) => state.authToken);
    const navigate = useNavigate();
    const { userID } = useParams();
    const [userData, setUserData] = useState({
        userID: '',
        firstName: '',
        lastName: '',
        password: '',
        isAdministrator: false
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveUser = async () => {
        if (!userData.userID || !userData.firstName || !userData.lastName || !userData.password) {
            toast.error('Bitte füllen Sie alle Felder aus.', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return}
        try {
            const response = await axios.post(`https://localhost/api/users`, userData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            // Handle the response data
            console.log('Created User:', response.data);
            navigate('/userManagementPage');
        } catch (error) {
            // Handle the error
            console.error('Error creating user:', error);
        }
    };

    const handleOpenUserList = () => {
        navigate('/userManagementPage');
    };

    return (
        <div id="UserManagementPageCreateComponent" style={Themes.background}>
            <UserCreateHeader />
            <Box sx={{ ...Themes.transparentStyle, color: 'white', border: 1, borderColor: "grey.500", margin: '10px' }}>
                <Typography variant="h4">Neuen User erstellen</Typography>

                <TextField
                    id="CreateUserComponentEditUserID"
                    name="userID"
                    label="User-ID"
                    variant="filled"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={userData.userID}
                    onChange={handleInputChange}
                />

                <TextField
                    id="CreateUserComponentEditFirstName"
                    name="firstName"
                    label="Vorname"
                    variant="filled"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={userData.firstName}
                    onChange={handleInputChange}
                />

                <TextField
                    id="CreateUserComponentEditLastName"
                    name="lastName"
                    label="Nachname"
                    variant="filled"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={userData.lastName}
                    onChange={handleInputChange}
                />

                <TextField
                    id="CreateUserComponentEditPassword"
                    name="password"
                    label="Passwort"
                    variant="filled"
                    type="password"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={userData.password}
                    onChange={handleInputChange}
                />

                <Select
                    id="CreateUserComponentEditIsAdministrator"
                    name="isAdministrator"
                    label="Is Administrator"
                    variant="outlined"
                    defaultValue={userData.isAdministrator}
                    onChange={handleInputChange}
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                >
                    <MenuItem value={false}>false</MenuItem>
                    <MenuItem value={true}>true</MenuItem>
                </Select>

                <Button
                    id="CreateUserComponentCreateUserButton"
                    variant="contained"
                    onClick={handleSaveUser}
                    sx={{ margin: '20px' }}
                >
                    User speichern
                </Button>
                <ToastContainer/>
                <Button
                    id="OpenUserManagementPageListComponentButton"
                    variant="outlined"
                    onClick={handleOpenUserList}
                    sx={{ margin: '20px' }}
                >
                    Zurück zur User-Liste
                </Button>
            </Box>
        </div>
    );
}

export default UserCreatePage;
