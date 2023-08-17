import React from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TaskIcon from '@mui/icons-material/Task';
import { Box, AppBar, Toolbar, Button } from "@mui/material";
import { Themes } from '../../../themes/Themes'

function HomeMenuBar({ isAdmin }) {
    const navigate = useNavigate()
    // const currentUser = useSelector(state => state.currentUser);
    // const isAdmin = useSelector(state => state.isAdmin);

    const handleUserClick = (event) => {
        navigate('/userManagementPage')
    }

    const handleHomeClick = (event) => {
        navigate('/homepage')
    }

    const handleDegreeCourseClick = (event) => {
        navigate('/degreeCourseManagementPage')
    }
    // console.log(isAdmin, 'isAdmin test in der home menu bar')

    const handleApplicationClick = (event) => {
        navigate('/applicationManagementPage')
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar id="appbar" position="sticky" className="transparent-appbar" sx={{ color: Themes.transparentStyle }}>
                <Toolbar>
                    <Button id="OpenStartPageButton" onClick={handleHomeClick} size="large" color="inherit" sx={{ mr: 2 }}>
                        <HomeIcon />
                    </Button>
                    {/* {isAdmin === true && ( */}
                        <Button id="OpenUserManagementPageButton" size="large" onClick={handleUserClick} color="inherit" sx={{ mr: 2 }}>
                            <PersonIcon />
                        </Button>
                    {/* )} */}
                    <Button id="OpenDegreeCourseManagementPageButton" onClick={handleDegreeCourseClick} size="large" color="inherit" sx={{ mr: 2 }}>
                        <SchoolIcon />
                    </Button>
                    <Button id="OpenDegreeCourseApplicationManagementPageButton" onClick={handleApplicationClick} size="large" color="inherit" sx={{ mr: 2 }}>
                        <TaskIcon />
                    </Button>
                </Toolbar>
            </AppBar>
        </Box >
    )
}
export default HomeMenuBar
