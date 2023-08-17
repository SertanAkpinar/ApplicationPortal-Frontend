import { Typography, Box, TextField, Button } from '@mui/material';
import DegreeCourseEditHeader from './degreeCourseEditPageComponents/DegreeCourseEditHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Themes } from '../../../themes/Themes'

function DegreeCourseEditPage() {
    const authToken = useSelector((state) => state.authToken);
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id)
    const [degreeCourseData, setDegreeCourseData] = useState({
        universityName: '',
        universityShortName: '',
        departmentName: '',
        departmentShortName: '',
        name: '',
        shortName: ''
    })

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost/api/degreeCourses/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            // Handle the response data
            console.log('DegreeCourse Data:', response.data);
            setDegreeCourseData(response.data);
        } catch (error) {
            // Handle the error
            console.error('Error fetching degreeCourse data:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDegreeCourseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveDegreeCourse = async () => {
        try {
            const response = await axios.put(`https://localhost/api/degreeCourses/${id}`, degreeCourseData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            // Handle the response data
            console.log('Updated Degree Course:', response.data);
            navigate('/degreeCourseManagementPage');
        } catch (error) {
            // Handle the error
            console.error('Error updating degreeCourse:', error);
        }
    };

    const handleOpenDegreeCourseList = () => {
        navigate('/degreeCourseManagementPage');
    };

    return (
        <div id="DegreeCourseManagementPageEditComponent" style={Themes.background}>
            <DegreeCourseEditHeader />
            <Box sx={{ ...Themes.transparentStyle, color: 'white', border: 1, borderColor: "grey.500", margin: '10px' }}>
                <Typography variant="h4">Degree Course bearbeiten - {degreeCourseData.name}</Typography>

                <TextField
                    id="EditDegreeCourseComponentEditName"
                    name="name"
                    label="Name"
                    variant="filled"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={degreeCourseData.name}
                    onChange={handleInputChange}
                />

                <TextField
                    id="EditDegreeCourseComponentEditShortName"
                    name="shortName"
                    label="Shortname"
                    variant="filled"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={degreeCourseData.shortName}
                    onChange={handleInputChange}
                />

                <TextField
                    id="EditDegreeCourseComponentEditUniversityName"
                    name="universityName"
                    label="University-Name"
                    variant="filled"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={degreeCourseData.universityName}
                    onChange={handleInputChange}
                />

                <TextField
                    id="EditDegreeCourseComponentEditUniversityShortName"
                    name="universityShortName"
                    label="University-Shortname"
                    variant="filled"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={degreeCourseData.universityShortName}
                    onChange={handleInputChange}
                />

                <TextField
                    id="EditDegreeCourseComponentEditDepartmentName"
                    name="departmentName"
                    label="department-Name"
                    variant="filled"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={degreeCourseData.departmentName}
                    onChange={handleInputChange}
                />

                <TextField
                    id="EditDegreeCourseComponentEditDepartmentShortName"
                    name="departmentShortName"
                    label="Department-Shortname"
                    variant="filled"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    defaultValue={degreeCourseData.departmentShortName}
                    onChange={handleInputChange}
                />

                <Button
                    id="EditDegreeCourseComponentSaveDegreeCourseButton"
                    variant="contained"
                    onClick={handleSaveDegreeCourse}
                    sx={{ margin: '20px' }}
                >
                    Degree Course speichern
                </Button>

                <Button
                    id="OpenDegreeCourseManagementPageListComponentButton"
                    variant="outlined"
                    onClick={handleOpenDegreeCourseList}
                    sx={{ margin: '20px' }}
                >
                    Zurück zur Degree Course-Liste
                </Button>
            </Box>
        </div>
    );
}

export default DegreeCourseEditPage;