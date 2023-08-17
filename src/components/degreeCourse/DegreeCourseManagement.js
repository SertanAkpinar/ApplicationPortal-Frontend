import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import axios from 'axios';
import DegreeCourseHeader from './degreeCourseManagementPage/DegreeCourseManagementHeader'
import HomeMenuBar from "../home/homePageComponent/HomeMenuBar";
import { Themes } from '../../themes/Themes'
import AddIcon from '@mui/icons-material/Add';

function DegreeCourseManagement() {
    const authToken = useSelector((state) => state.authToken);
    const [degreeCourseData, setDegreeCourseData] = useState([]);
    const navigate = useNavigate()
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedDegreeCourse, setSelectedDegreeCourse] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
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

    const handleDegreeCourseEditClick = (selectedDegreeCourse) => {
        navigate(`/degreeCourseEdit/${selectedDegreeCourse._id}`)
    }

    const handleDegreeCourseCreateClick = () => {
        navigate(`/degreeCourseCreate`)
    }

    const handleDeleteClick = (degreeCourse) => {
        setSelectedDegreeCourse(degreeCourse);
        setDeleteDialogOpen(true);
    }

    const handleDeleteConfirm = async () => {
        try {
            const response = await axios.delete(`https://localhost:443/api/degreeCourses/${selectedDegreeCourse._id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            console.log('Deleted Degree Course:', response.data);
            setDeleteDialogOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error deleting Degree Course:', error);
        }
    };

    const handleApplyClick = (selectedDegreeCourse) => {
        setSelectedDegreeCourse(selectedDegreeCourse);
        navigate(`/degreeCourseApplication/${selectedDegreeCourse._id}`)
    }

    return (
        <div id="DegreeCourseManagementPageListComponent" style={Themes.background}>
            <DegreeCourseHeader />
            <Box sx={{ display: 'flex', alignItems: 'center', ...Themes.transparentStyle, m: 1 }} color={"white"}>
                <Typography variant="h4" sx={{ borderRight: 1, paddingRight: '10px' }}> DegreeCourse-Liste </Typography>
                <Button id="DegreeCourseManagementPageCreateDegreeCourseButton" onClick={handleDegreeCourseCreateClick} size="large" color="inherit" sx={{ m: 1, }}>
                    <AddIcon />
                </Button>
            </Box>
            <div style={Themes.boxContainer}>
                {degreeCourseData.map((degreeCourse) => (
                    <Box key={degreeCourse._id} id={`DegreeCourseItem${degreeCourse._id}`} sx={{ ...Themes.transparentStyle, border: 1, borderColor: 'grey.500', margin: '10px', textAlign: 'center' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'grey.500', marginBottom: '10px' }}>
                            <Typography color="white">{degreeCourse.shortName} {degreeCourse.name}</Typography>
                        </Box>
                        <Typography color="white">Universität: {degreeCourse.universityName}</Typography>
                        <Typography color="white">Department: {degreeCourse.departmentName}</Typography>
                        <Typography color="white">Studiengang: {degreeCourse.name}</Typography>
                        <Box sx={{ borderTop: 1, borderColor: 'grey.500', marginTop: '10px' }}>
                            <Button variant="outlined" id={`DegreeCourseItemEditButton${degreeCourse._id}`} sx={{ margin: '10px' }} onClick={() => handleDegreeCourseEditClick(degreeCourse)}>Edit</Button>
                            <Button variant="outlined" id={`DegreeCourseItemDeleteButton${degreeCourse._id}`} sx={{ margin: '10px' }} onClick={() => handleDeleteClick(degreeCourse)}>Delete</Button>
                            <Button variant="outlined" id={`CreateDegreeCourseApplicationForDegreeCourse${degreeCourse?._id}`} sx={{ margin: '10px' }} onClick={() => handleApplyClick(degreeCourse)}>Create Application</Button>
                        </Box>
                    </Box>
                ))}
            </div>
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle id={`DeleteDialogDegreeCourse${selectedDegreeCourse?._id}`} sx={{ borderBottom: 1 }}>Delete DegreeCourse {`${selectedDegreeCourse?._id}`}</DialogTitle>
                <Typography sx={{ m: 2 }}>Soll der Studiengang {`${selectedDegreeCourse?.name} `} wirklich gelöcht werden?</Typography>
                <DialogActions sx={{ borderTop: 1 }}>
                    <Button id="DeleteDialogConfirmButton" onClick={handleDeleteConfirm} color="error">Delete</Button>
                    <Button id="DeleteDialogCancelButton" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>


            <HomeMenuBar />
        </div>


    )
}

export default DegreeCourseManagement