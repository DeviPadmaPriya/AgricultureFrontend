import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UserService from '../../../service/UserService';
import Swal from 'sweetalert2';

import BackgroundImage from './loginfarmer.jpg';

const FarmerLogin = () => {
    const backgroundImageStyle = {
           
        backgroundImage:  `url(${BackgroundImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', 
    }
    const navigate = useNavigate();

    const [userCredentials, setUserCredentials] = useState({
        uEmail: '',
        uPassword: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    const loginUser = async(e) => {
        e.preventDefault();
        const validationErrors = validate(userCredentials);
    

        if (Object.keys(validationErrors).length === 0) {
            UserService.signin(userCredentials)
                .then(response => {
                    // const content = await response.json();
                    if (response.data === 'Check your email or Password') {
                        
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Invalid Credentials',
                            showConfirmButton: false,
                            timer: 3000
                        });
                    } else {
                       
                        const userData= response.data;
                        // console.log('Login successful', response.data);
                        console.log('User ID:', userData.userid);
                        console.log('Email:', userData.uEmail);
                        console.log('Password:', userData.uPassword);

                        localStorage.setItem('userid', userData.userid);
                        // console.log(localStorage.getItem('userid'));
                        Swal.fire({
                            icon: 'success',
                            title: 'Logged In!',
                            text: 'Login Successful.',
                            showConfirmButton: false,
                            timer: 4000
                        });
                        navigate('/viewAllcrop');
                    }
                })
       
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Invalid Credentials',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    console.log('User login failed', error);
                });
        } else {
            setErrors(validationErrors);
        }
    };


    function validate({ uEmail, uPassword }) {
        let validationErrors = {};

        if (!uEmail?.trim()) {
            validationErrors.uEmail = 'Email required';
        }

        if (!uPassword) {
            validationErrors.uPassword = 'Password is required';
        }

        return validationErrors;
    }

    return (
        < >
        <div  style={backgroundImageStyle}>
            <br />
            <br />
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="uEmail"
                            label="uEmail"
                            name="uEmail"
                            autoComplete="uEmail"
                            autoFocus
                            value={userCredentials.uEmail}
                            onChange={handleInputChange} 
                            style={{ backgroundColor: 'white' }}                        />
                        {errors.uEmail && <p style={{ color: 'red' }}>{errors.uEmail}</p>}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="uPassword"
                            label="Password"
                            type="password"
                            id="uPassword"
                            autoComplete="current-uPassword"
                            value={userCredentials.uPassword}
                            onChange={handleInputChange}  
                            style={{ backgroundColor: 'white' }}                       />
                        {errors.uPassword && <p style={{ color: 'red' }}>{errors.uPassword}</p>}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={loginUser}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="http://localhost:3000/farmerRegister" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            </div>
        </>
    );

    
};

export default FarmerLogin;
