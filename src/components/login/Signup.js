import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Grid,
    Paper,
    TextField,
    Typography,
    Avatar,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,
    Button,
} from '@mui/material';

import { BASE_URL_USERS } from '../../assets/urls/urls';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { NavLink } from 'react-router-dom';

const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let timer = null;

const postUser = async (user) => {
    await axios.post(BASE_URL_USERS, user)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

const Signup = () => {
    const [data, setData] = useState({
        email: "",
        username: "",
        password: "",
        name: {
            firstname: "",
            lastname: "",
        },
        address: {
            city: 'kilcoole',
            street: '7835 new road',
            number: 3,
            zipcode: '12926-3874',
            geolocation: {
                lat: '-37.3159',
                long: '81.1496'
            }
        },
        phone: '1-570-236-7033'
    });

    const [isValid, setIsValid] = useState({
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        password: undefined,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleFirstName = (e) => {
        setData((prevState) => ({
            ...prevState,
            name: {
                ...prevState.name,
                firstname: e.target.value.trim(),
            },
        }));
        setIsValid((prevState) => ({ ...prevState, name: undefined }));
    };

    const handleLastname = (e) => {
        setData((prevState) => ({
            ...prevState,
            username: e.target.value.trim(),
            name: {
                ...prevState.name,
                lastname: e.target.value.trim(),
            }
        }));
        setIsValid((prevState) => ({ ...prevState, lastname: undefined }));
    };

    const handleEmail = (e) => {
        setData((prevState) => ({ ...prevState, email: e.target.value.trim().toLowerCase() }));
        setIsValid((prevState) => ({ ...prevState, email: undefined }));
    };

    const handlePassword = (e) => {
        setData((prevState) => ({ ...prevState, password: e.target.value.trim() }));
        setIsValid((prevState) => ({ ...prevState, password: undefined }));
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        clearTimeout(timer);
        let valid = true;
        let keyStr = '';
        if (data.name.firstname === '') {
            valid = false;
            keyStr = 'firstname';
        } else if (data.name.lastname === '') {
            valid = false;
            keyStr = 'lastname';
        } else if (!regex.test(data.email)) {
            valid = false;
            keyStr = 'email';
        } else if (data.password.length < 3) {
            valid = false;
            keyStr = 'password';
        }

        if (valid) {
            console.log(data);
            postUser(data);
        } else {
            console.log(keyStr);
            setIsValid((prevState) => ({ ...prevState, [keyStr]: false }));
        }
    };

    useEffect(() => {
        timer = setTimeout(() => {
            if (isValid.email === undefined) {
                if (data.email.length > 0) {
                    if (!regex.test(data.email)) {
                        setIsValid((prevState) => ({ ...prevState, email: false }));
                        return;
                    }
                }
            }
            if (isValid.password === undefined) {
                if (data.password.length > 0 && data.password.length < 3) {
                    setIsValid((prevState) => ({ ...prevState, password: false }));
                    return;
                }
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [data]);

    return (
        <Box sx={{
            width: { xs: "85%", sm: "60%", md: "45%", lg: "35%" },
            margin: "auto",
        }}>
            <Paper elevation={10} sx={{ padding: '7px 35px', margin: '7px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{
                        marginBottom: '5px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Avatar sx={{ m: 2, bgcolor: '#1bbd7e' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography variant="h5" align="center">Sign Up</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            fullWidth
                            required
                            label="First Name"
                            variant="outlined"
                            {...(isValid.firstname === false && { error: true, helperText: "First name is required" })}
                            value={data.name.firstname}
                            onChange={handleFirstName}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            fullWidth
                            required
                            label="Last Name"
                            variant="outlined"
                            {...(isValid.lastname === false && { error: true, helperText: "Last name is required" })}
                            value={data.name.lastname}
                            onChange={handleLastname}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            fullWidth
                            required
                            label="Email"
                            variant="outlined"
                            type="email"
                            {...(isValid.email === false && { error: true, helperText: data.email.length < 1 ? "Email is required" : "Email is not valid" })}
                            value={data.email}
                            onChange={handleEmail}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <FormControl
                            fullWidth
                            variant="outlined"
                            {...(isValid.password === false && { error: true })} >
                            <InputLabel htmlFor='password' required>
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={handlePassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            {isValid.password === false && <FormHelperText>{data.password.length < 1 ? "Passwored is required" : 'Password invalid'}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#1bbd7e',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#11d888',
                                    color: '#fff'
                                }
                            }}
                            onClick={handleSubmit}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid align="center" sx={{ margin: '15px auto', paddingBottom: '10px' }}>
                            <Typography>
                                Already have an account? <NavLink style={{ textDecoration: 'none', fontWeight: 'bold' }} to="/signin">Sign In</NavLink>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default Signup;