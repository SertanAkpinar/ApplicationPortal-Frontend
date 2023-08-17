import { Typography, Box, TextField, Button, Select, MenuItem } from '@mui/material';
import ApplicationCreatePageHeader from "./applicationCreatePageComponent/ApplicationCreatePageHeader"
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Themes } from '../../../themes/Themes'

function ApplicationCreatePage() {
    const authToken = useSelector((state) => state.authToken);
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [degreeCourseList, setDegreeCourseList] = useState([]);
    const [applicationData, setApplicationData] = useState({
        degreeCourseID: '',
        applicantUserID: '',
        targetPeriodYear: '',
        targetPeriodShortName: '',
    })

    useEffect(() => {
        fetchUserList();
        fetchDegreeCourse();
    }, []);

    const fetchUserList = async () => {
        try {
            const response = await axios.get('https://localhost:443/api/users', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log('Users:', response.data);
            setUserList(response.data);
        } catch (error) {
            console.error('Error fetching Users:', error);
        }
    };

    const fetchDegreeCourse = async () => {
        try {
            const response = await axios.get(`https://localhost:443/api/degreeCourses`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            // Handle the response data
            console.log('Degree Course Data:', response.data);
            setDegreeCourseList(response.data);
        } catch (error) {
            // Handle the error
            console.error('Error fetching degree course data:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setApplicationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveApplication = async () => {
        if (!applicationData.degreeCourseID || !applicationData.applicantUserID ||
            !applicationData.targetPeriodYear || !applicationData.targetPeriodShortName) {
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
            const response = await axios.post(`https://localhost/api/degreeCourseApplications`, applicationData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });
            // Handle the response data
            console.log('Created Application:', response.data);
            navigate('/applicationManagementPage');
        } catch (error) {
            // Handle the error
            console.error('Error creating Application:', error);
        }
    };

    const handleOpenApplicationList = () => {
        navigate('/applicationManagementPage');
    };

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const endYear = 2050;
        const yearOptions = [];

        for (let year = currentYear; year <= endYear; year++) {
            yearOptions.push(
                <MenuItem key={year} value={year}>
                    {year}
                </MenuItem>
            );
        }
        return yearOptions;
    }

    return (
        <div id={`CreateDegreeCourseApplicationForDegreeCourse${applicationData.degreeCourse}`} style={Themes.background}>
            <ApplicationCreatePageHeader />
            <Box sx={{ ...Themes.transparentStyle, color: 'white', border: 1, borderColor: "grey.500", margin: '10px' }}>
                <Typography variant="h4">Neue Bewerbung erstellen</Typography>

                <Select
                    id="CreateUserComponentEditDegreeCourse"
                    name="degreeCourseID"
                    label="Degree Course"
                    variant="outlined"
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    onChange={handleInputChange}
                    value={applicationData.degreeCourseID || ''}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        Wähle ein Studiengang
                    </MenuItem>
                    {degreeCourseList.map((degreeCourse) => (
                        <MenuItem key={degreeCourse._id} value={degreeCourse._id}>
                            {degreeCourse.name}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    id="CreateDegreeCourseApplicationEditUserID"
                    name="applicantUserID"
                    label="User-ID"
                    variant="outlined"
                    value={applicationData.applicantUserID || ''}
                    onChange={handleInputChange}
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        Wähle den User
                    </MenuItem>
                    {userList.map((user) => (
                        <MenuItem key={user.userID} value={user.userID}>
                            {user.userID}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    id="CreateDegreeCourseApplicationEditTargetPeriodYear"
                    name="targetPeriodYear"
                    label="Target Period Year"
                    variant="outlined"
                    value={applicationData.targetPeriodYear || ''}
                    onChange={handleInputChange}
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                displayEmpty
                >
                    <MenuItem value="" disabled>
                        Wähle das Jahr
                    </MenuItem>
                    {generateYearOptions()}
                </Select>

                <Select
                    id="CreateDegreeCourseApplicationEditTargetPeriodName"
                    name="targetPeriodShortName"
                    label="Target Period Name"
                    variant="outlined"
                    value={applicationData.targetPeriodShortName || ''}
                    onChange={handleInputChange}
                    sx={{ ...Themes.inputStyle, border: 1, borderColor: "grey.500", margin: '10px' }}
                displayEmpty
                >
                     <MenuItem value="" disabled>
                        Wähle das Semester
                    </MenuItem>
                    <MenuItem value={'SoSe'}>SoSe</MenuItem>
                    <MenuItem value={'WiSe'}>WiSe</MenuItem>
                </Select>

                <Button
                    id="CreateDegreeCourseApplicationCreateButton"
                    variant="contained"
                    onClick={handleSaveApplication}
                    sx={{ margin: '20px' }}
                >
                    Bewerbung speichern
                </Button>
                <ToastContainer />
                <Button
                    id="OpenDegreeCourseApplicationManagementPageButton"
                    variant="outlined"
                    onClick={handleOpenApplicationList}
                    sx={{ margin: '20px' }}
                >
                    Zurück zur Bewerbungs-Liste
                </Button>
            </Box>
        </div>
    )
}

export default ApplicationCreatePage;