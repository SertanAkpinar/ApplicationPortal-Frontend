import React, { useState, useEffect } from "react";
import axios from "axios";
import UserManagementHeader from "./userManagementPageComponent/UserManagementHeader";
import HomeMenuBar from "../../home/homePageComponent/HomeMenuBar";
import { Typography, Box, Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Themes } from '../../../themes/Themes'

function UserManagementPage() {
    const authToken = useSelector((state) => state.authToken);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate()
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // const location = useLocation(); // Erhalten Sie den Standort, um den isAdmin-Wert zu erhalten
    // const isAdmin = location.state?.isAdmin;

// console.log(isAdmin, 'isAdmin test in der usermangementpage component')

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:443/api/users', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log('Users:', response.data);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUserEditClick = (userID) => {
        navigate(`/userEdit/${userID}`)
    }

    const handleUserCreateClick = () => {
        navigate(`/userCreate`)
    }

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await axios.delete(`https://localhost:443/api/users/${selectedUser.userID}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            console.log('Deleted User:', response.data);
            setDeleteDialogOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div id="UserManagementPage" style={Themes.background}>
            <UserManagementHeader />

            <Box sx={{ display: 'flex', alignItems: 'center', ...Themes.transparentStyle, m: 1 }} color={"white"}>
                <Typography variant="h4" sx={{ borderRight: 1, paddingRight: '10px' }}> User-Liste </Typography>
                <Button id="UserManagementPageCreateUserButton" onClick={handleUserCreateClick} size="large" color="inherit" sx={{ m: 1, }}>
                    <AddIcon />
                </Button>
            </Box>

            <div style={Themes.boxContainer}>
                {userData.map((user) => (
                    <Box key={user.userID} id={`UserItem${user.userID}`} sx={{ ...Themes.transparentStyle, border: 1, borderColor: 'grey.500', margin: '10px', textAlign: 'center' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'grey.500', marginBottom: '10px' }}>
                            <Typography color="white">{user.firstName} {user.lastName}</Typography>
                        </Box>
                        <Typography color="white">UserID: {user.userID}</Typography>
                        <Typography color="white">Firstname: {user.firstName}</Typography>
                        <Typography color="white">Lastname: {user.lastName}</Typography>
                        <Box sx={{ borderTop: 1, borderColor: 'grey.500', marginTop: '10px' }}>
                            <Button variant="outlined" id={`UserItemEditButton${user.userID}`} sx={{ margin: '10px' }} onClick={() => handleUserEditClick(user.userID)}>Edit</Button>
                            <Button variant="outlined" id={`UserItemDeleteButton${user.userID}`} sx={{ margin: '10px' }} onClick={() => handleDeleteClick(user)}>Delete</Button>
                        </Box>
                    </Box>
                ))}
            </div>
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle id={`DeleteDialogUser${selectedUser?.userID}`} sx={{ borderBottom: 1 }}>Delete User </DialogTitle>
                <Typography sx={{ m: 2 }}>Soll der User {`${selectedUser?.firstName} ${selectedUser?.lastName}`} wirklich gelöcht werden?</Typography>
                <DialogActions sx={{ borderTop: 1 }}>
                    <Button id="DeleteDialogCancelButton" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button id="DeleteDialogConfirmButton" onClick={handleDeleteConfirm} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
            <HomeMenuBar />
        </div >
    );
}

export default UserManagementPage;