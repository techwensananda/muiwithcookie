import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';


const Spinner = () => {
  return (
    <Box  sx={{
       height:'100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <CircularProgress />

    </Box>
  )
}

export default Spinner