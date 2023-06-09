import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Snackbars from '../../components/SnakBar';
import { useLoginMutation } from './authApiSlice';
import { setCredentials } from './authSlice';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();



export default function Login() {
    const [login, { isLoading,error:loginErr ,isSuccess}] = useLoginMutation()
const [errMsg, setErrMsg] = React.useState('')
const dispatch = useDispatch()
const navigate = useNavigate();
const[openSnakbar,setOpenSnakbar]=React.useState(false)
const[snakbarMsg,setSnakbarMsg]=React.useState("")
const[snakbarType,setSnakbarType]=React.useState('success')

const userRef = React.useRef()
const errRef = React.useRef()
React.useEffect(() => {
    userRef.current.focus()
}, [])

React.useEffect(() => {
    if(loginErr && !isLoading){
      setSnakbarType('warning')
      setOpenSnakbar(true)
      setSnakbarMsg(loginErr)
    }
  
}, [loginErr,isLoading,isSuccess])
React.useEffect(() => {
  
    if(isSuccess && !isLoading){
      setSnakbarType('success')
      setOpenSnakbar(true)
      setSnakbarMsg({data:'Login success'})
      setTimeout(() => {
        navigate('/dashboard')
      },1000)
    }
}, [isLoading,isSuccess])
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
        const userData = await login({ user:data.get('username'), pwd :data.get('password')}).unwrap()
        dispatch(setCredentials({ ...userData, user:data.get('username') }))
     
      
    } catch (err) {
        if (!err?.originalStatus) {
            // isLoading: true until timeout occurs
            setErrMsg('No Server Response');
        } else if (err.originalStatus === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.originalStatus === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        // errRef.current.focus();
    }



  
  };



  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                ref={userRef}

                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbars snakbarType={snakbarType} snakbarMsg={snakbarMsg} openSnakbar={openSnakbar} setOpenSnakbar={setOpenSnakbar}/>
    </ThemeProvider>
  );
}