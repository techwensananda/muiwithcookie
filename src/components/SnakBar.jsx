import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import * as React from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbars({setOpenSnakbar,openSnakbar,snakbarMsg,snakbarType}) {
 


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnakbar(false);
  };
  console.log('snakbarMsg?.data', snakbarMsg?.data)

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
    
      <Snackbar anchorOrigin={{ vertical: 'top',
    horizontal: 'center' }} open={openSnakbar} autoHideDuration={6000} onClose={handleClose}>
     
        <Alert onClose={handleClose} severity={snakbarType} sx={{ width: '100%' }}>
         {snakbarMsg?.data}
        </Alert>
      </Snackbar>
   
    </Stack>
  );
}