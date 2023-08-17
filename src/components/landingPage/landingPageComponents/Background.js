import { Typography, Box } from '@mui/material';
import Header from './Header';
import { Themes } from '../../../themes/Themes'

function Background() {
  return (
    <div style={Themes.background}>
      <Header />
      <Box sx={Themes.transparentStyle}>
        <Typography variant="h1" sx={{ color: 'white', textAlign: 'center' }}>
          I'm gonna send you to outa Space, to find another job
        </Typography>
        <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', marginTop: '10px' }}>
          Bewerben Sie sich hier für einen Studiengang im Weltall
        </Typography>
      </Box>
    </div>
  );
}

export default Background;
