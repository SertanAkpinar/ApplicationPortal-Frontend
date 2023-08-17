import { Typography, Box } from '@mui/material';
import HomeHeader from './homePageComponent/HomeHeader';
import { useSelector } from 'react-redux';
import HomeMenuBar from './homePageComponent/HomeMenuBar';
import { Themes } from '../../themes/Themes'
import { useLocation } from "react-router-dom";

function Homepage() {
  // const isAdmin = useSelector(state => state.isAdmin);

   const location = useLocation(); // Erhalten Sie den Standort, um den isAdmin-Wert zu erhalten
    const isAdmin = location.state?.isAdmin;

// console.log(isAdmin, 'isAdmin test in der homepage component')

  // console.log('Token im Redux Store:', authToken);
  return (
    <div className='page-content' id='StartPage' style={Themes.background}>
      <HomeHeader />
      <Box sx={{...Themes.transparentStyle, m:2}}>
        <Typography variant="h4" sx={{ color: 'white'}}>
          We are happy that you choose us to fly.
        </Typography>
      </Box>
      <HomeMenuBar isAdmin={isAdmin}/>
    </div>
  );
}

export default Homepage;
