import { Typography, Box, TextField, Button, Select, MenuItem } from '@mui/material';
import DegreeCourseCreateHeader from './degreeCourseCreatePageComponents/DegreeCourseCreateHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Themes } from '../../../themes/Themes'

function DegreeCourseCreatePage() {
    const authToken = useSelector((state) => state.authToken);
    const navigate = useNavigate();
    const { name } = useParams();
    const [degreeCourseData, setDegreeCourseData] = useState({
        universityName: '',
        universityShortName: '',
        departmentName: '',
        departmentShortName: '',
        name: '',
        shortName: ''
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDegreeCourseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveDegreeCourse = async () => {
        if (!degreeCourseData.universityName || !degreeCourseData.universityShortName || !degreeCourseData.departmentName ||
            !degreeCourseData.departmentShortName || !degreeCourseData.name || !degreeCourseData.shortName) {
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
            return
        }
        try {
            const response = await axios.post(`https://localhost/api/degreeCourses`, degreeCourseData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });
            // Handle the response data
            console.log('Created Degree Course:', response.data);
            navigate('/degreeCourseManagementPage');
        } catch (error) {
            // Handle the error
            console.error('Error creating Degree Course:', error);
        }
    };

    const handleOpenDegreeCourseList = () => {
        navigate('/degreeCourseManagementPage');
    };

    return (
        <div id="DegreeCourseManagementPageCreateComponent" style={Themes.background}>
            <DegreeCourseCreateHeader/>
            <Box sx={{ ...Themes.transparentStyle, color: 'white', border: 1, borderColor: "grey.500", margin: '10px' }}>
                <Typography variant="h4">Neuen Studiengang erstellen</Typography>

                <TextField
                    id="CreateDegreeCourseComponentEditName"
                    name="name"
                    label="Name"
                    variant="filled"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={degreeCourseData.name}
                    onChange={handleInputChange}
                />

                <TextField
                    id="CreateDegreeCourseComponentEditShortName"
                    name="shortName"
                    label="Shortname"
                    variant="filled"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={degreeCourseData.shortName}
                    onChange={handleInputChange}
                />

                <TextField
                    id="CreateDegreeCourseComponentEditUniversityName"
                    name="universityName"
                    label="University-Name"
                    variant="filled"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={degreeCourseData.universityName}
                    onChange={handleInputChange}
                />

                <TextField
                    id="CreateDegreeCourseComponentEditUniversityShortName"
                    name="universityShortName"
                    label="University-Shortname"
                    variant="filled"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={degreeCourseData.universityShortName}
                    onChange={handleInputChange}
                />

                <TextField
                    id="CreateDegreeCourseComponentEditDepartmentName"
                    name="departmentName"
                    label="department-Name"
                    variant="filled"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={degreeCourseData.departmentName}
                    onChange={handleInputChange}
                />

                <TextField
                    id="CreateDegreeCourseComponentEditDepartmentShortName"
                    name="departmentShortName"
                    label="Department-Shortname"
                    variant="filled"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={degreeCourseData.departmentShortName}
                    onChange={handleInputChange}
                />

                <Button
                    id="CreateDegreeCourseComponentCreateDegreeCourseButton"
                    variant="contained"
                    onClick={handleSaveDegreeCourse}
                    sx={{ margin: '20px' }}
                >
                    Studiengang speichern
                </Button>
                <ToastContainer/>
                <Button
                    id="OpenDegreeCourseManagementPageListComponentButto"
                    variant="outlined"
                    onClick={handleOpenDegreeCourseList}
                    sx={{ margin: '20px' }}
                >
                    Zurück zur Studiengang-Liste
                </Button>
            </Box>
        </div>
    )
}

export default DegreeCourseCreatePage