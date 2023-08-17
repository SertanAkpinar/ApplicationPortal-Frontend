// import { TextField, Button, Select, MenuItem, } from '@mui/material';
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from 'react-router-dom';
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const styles = {
//     inputStyle: {
//                 backgroundColor: 'white',
//             },
//     }

// function UserEditHandling() {
//     const authToken = useSelector((state) => state.authToken);
//     const navigate = useNavigate();
//     const { userID } = useParams();
//     const [userData, setUserData] = useState({
//         userID: '',
//         firstName: '',
//         lastName: '',
//         password: '',
//         isAdministrator: false
//     });

//     // useEffect(() => {
//     //     fetchData();
//     // }, []);

//     // const fetchData = async () => {
//     //     try {
//     //         const response = await axios.get(`https://localhost/api/users/${userID}`, {
//     //             headers: {
//     //                 Authorization: `Bearer ${authToken}`,
//     //             },
//     //         });

//     //         console.log('User Data:', response.data);
//     //         setUserData(response.data);
//     //     } catch (error) {
//     //         console.error('Error fetching user data:', error);
//     //     }
//     // };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setUserData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSaveUser = async () => {
//         try {
//             const response = await axios.put(`https://localhost:443/api/users/${userID}`, userData, {
//                 headers: {
//                     Authorization: `Bearer ${authToken}`,
//                     'Content-Type': 'application/json',
//                 },
//             });

//             console.log('Updated User:', response.data);
//             navigate('/userManagementPage');
//         } catch (error) {
//             console.error('Error updating user:', error);
//         }
//     };

//     const handleOpenUserList = () => {
//         navigate('/userManagementPage');
//     };

//     return (
//         <div>
//             <TextField
//                 id="EditUserComponentEditUserID"
//                 name="userID"
//                 label="User-ID"
//                 variant="filled"
//                 sx={{ ...styles.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
//                 defaultValue={userData.userID}
//                 onChange={handleInputChange}
//             />

//             <TextField
//                 id="EditUserComponentEditFirstName"
//                 name="firstName"
//                 label="Vorname"
//                 variant="filled"
//                 sx={{ ...styles.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
//                 defaultValue={userData.firstName}
//                 onChange={handleInputChange}
//             />

//             <TextField
//                 id="EditUserComponentEditLastName"
//                 name="lastName"
//                 label="Nachname"
//                 variant="filled"
//                 sx={{ ...styles.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
//                 defaultValue={userData.lastName}
//                 onChange={handleInputChange}
//             />

//             <TextField
//                 id="EditUserComponentEditPassword"
//                 name="password"
//                 label="Passwort"
//                 variant="filled"
//                 type="password"
//                 sx={{ ...styles.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
//                 defaultValue={userData.password}
//                 onChange={handleInputChange}
//             />

//             <Select
//                 id="EditUserComponentEditIsAdministrator"
//                 name="isAdministrator"
//                 label="Is Administrator"
//                 variant="outlined"
//                 defaultValue={userData.isAdministrator}
//                 onChange={handleInputChange}
//                 sx={{ ...styles.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
//             >
//                 <MenuItem value={false}>false</MenuItem>
//                 <MenuItem value={true}>true</MenuItem>
//             </Select>

//             <Button
//                 id="EditUserComponentSaveUserButton"
//                 variant="contained"
//                 onClick={handleSaveUser}
//                 sx={{ margin: '20px' }}
//             >
//                 User speichern
//             </Button>

//             <Button
//                 id="OpenUserManagementPageListComponentButton"
//                 variant="outlined"
//                 onClick={handleOpenUserList}
//                 sx={{ margin: '20px' }}
//             >
//                 Zurück zur User-Liste
//             </Button>

//         </div>
//     );
// }

// export default UserEditHandling;
