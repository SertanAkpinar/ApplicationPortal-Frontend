import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import axios from 'axios';
import ApplicationHeader from "./applicationManagementPageComponents/ApplicationManagementHeader"
import HomeMenuBar from "../../home/homePageComponent/HomeMenuBar";
import { Themes } from '../../../themes/Themes'
import AddIcon from '@mui/icons-material/Add';

function ApplicationManagement() {
    const authToken = useSelector((state) => state.authToken);
    const [applicationData, setApplicationData] = useState([]);
    const [degreeCourseData, setDegreeCourseData] = useState([]);
    const navigate = useNavigate()
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [selectedDegreeCourse, setSelectedDegreeCourse] = useState(null);

    useEffect(() => {
        fetchData();
        fetchDataDC()
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:443/api/degreeCourseApplications', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log('Applications:', response.data);
            setApplicationData(response.data);
        } catch (error) {
            console.error('Error fetching Degree Courses:', error);
        }
    };

    const fetchDataDC = async () => {
        try {
            const response = await axios.get('https://localhost:443/api/degreeCourses', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log('Degree Courses:', response.data);
            setDegreeCourseData(response.data);
        } catch (error) {
            console.error('Error fetching Degree Courses:', error);
        }
    };

    const handleApplicationCreateClick = () => {
        navigate(`/applicationCreate`)
    }

    const handleDeleteClick = (application) => {
        setSelectedApplication(application);
        setDeleteDialogOpen(true);
    }

    const handleDeleteConfirm = async () => {
        try {
            console.log(selectedApplication._id, 'id der bewerbung')
            const response = await axios.delete(`https://localhost:443/api/degreeCourseApplications/${selectedApplication._id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            console.log('Deleted Application:', response.data);
            setDeleteDialogOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error deleting Application:', error);
        }
    };
    const handleApplyClick = () => {
        navigate(`/degreeCourseApplication`)
    }

    return (
        <div id="DegreeCourseApplicationManagementPageListComponent" style={Themes.background}>
            <ApplicationHeader />
            <Box sx={{ display: 'flex', alignItems: 'center', ...Themes.transparentStyle, m: 1 }} color={"white"}>
                <Typography variant="h4" sx={{ borderRight: 1, paddingRight: '10px' }}> Bewerbungs-Liste </Typography>
                <Button id={`CreateDegreeCourseApplicationForDegreeCourse`} onClick={handleApplyClick} size="large" color="inherit" sx={{ m: 1, }}>
                    <AddIcon />
                </Button>
            </Box>

            <div style={Themes.boxContainer}>
            {applicationData.map((application) => {
                    const degreeCourse = degreeCourseData.find((dc) => dc._id === application.degreeCourseID);
                    return (
                        <Box key={application._id} id={`DegreeCourseApplicationItem${application._id}`} sx={{ ...Themes.transparentStyle, border: 1, borderColor: 'grey.500', margin: '10px', textAlign: 'center' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'grey.500', marginBottom: '10px' }}>
                                <Typography color="white" id={`ApplicantUserID${application._id}`}>{application.applicantUserID} {application.targetPeriodShortName} {application.targetPeriodYear}</Typography>
                            </Box>
                            <Typography color="white">User: {application.applicantUserID}</Typography>
                            <Typography color="white">Bewerbungsjahr: {application.targetPeriodYear}</Typography>
                            <Typography color="white">Bewerbungssemester: {application.targetPeriodShortName}</Typography>
                            {degreeCourse && (
                                <>
                                    <Typography color="white" id={`DegreeCourseName${application._id}`}>Studiengang: {degreeCourse.name}</Typography>
                                    <Typography color="white" id={`UniversityShortName${application._id}`}>Universität: {degreeCourse.universityName}</Typography>
                                    <Typography color="white" id={`DepartmentName${application._id}`}>Fachbereich: {degreeCourse.departmentName}</Typography>

                                    <Box sx={{ borderTop: 1, borderColor: 'grey.500', marginTop: '10px' }}>
                                    <Button variant="outlined" id={`DegreeCourseItemApplicationDeleteButton${application._id}`} sx={{ margin: '10px' }} onClick={() => handleDeleteClick(application)}>Delete</Button>
                                    </Box>
                                </>
                            )}
                        </Box>
                    );
                })}
            </div>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle id={`DeleteDialogDegreeCourseApplication${selectedApplication?._id}`} sx={{ borderBottom: 1 }}>Delete Application {`${selectedApplication?._id}`}</DialogTitle>
                <Typography sx={{ m: 2 }}>Soll die Bewerbung wirklich gelöcht werden?</Typography>
                <DialogActions sx={{ borderTop: 1 }}>
                    <Button id="DeleteDialogConfirmButton" onClick={handleDeleteConfirm} color="error">Delete</Button>
                    <Button id="DeleteDialogCancelButton" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>


            <HomeMenuBar />
        </div>


    )
}

export default ApplicationManagement