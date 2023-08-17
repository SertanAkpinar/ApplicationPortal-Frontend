import { createTheme } from '@mui/material';
import universe from './img/universe.jpg'

export const Themes = createTheme({
    background: {
        backgroundImage: `url(${universe})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      },
      transparentStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '8px',
      },
      inputStyle: {
        backgroundColor: 'white',
    },
    boxContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
  },
  userBox: {
      width: '300px',
      margin: '10px',
      padding: '10px',
      backgroundColor: 'white',
      borderRadius: '8px',
  },
})

export default Themes