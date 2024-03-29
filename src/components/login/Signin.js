import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSignin } from '../../store/slices/oauthSlice';

import {
    Box,
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    FormHelperText,
    Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { NavLink } from 'react-router-dom';

let timer = null;

const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isValid, setIsValid] = useState({email: undefined, password: undefined});

    const dispatch = useDispatch();
    const oauth = useSelector(state => state.oauth);

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setIsValid((prevState) => ({...prevState, email: undefined}));
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setIsValid((prevState) => ({...prevState, password: undefined}));
    }

    const handleSubmit = (e) => {
        if(e.type === "keydown" && e.keyCode !== 13) return;
        e.preventDefault();
        if(oauth.loading) return;
        clearTimeout(timer);
        if(isValid.email === undefined){
            if(!regex.test(email)){
                setIsValid((prevState) => ({...prevState, email: false}));
                return;
            }
        }
        if(isValid.password === undefined){
            if(password.length < 3){
                setIsValid((prevState) => ({...prevState, password: false}));
                return;
            }
        }
        if(isValid.email && isValid.password){
            dispatch(fetchSignin({email, password}));
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        timer = setTimeout(() => {
            if(isValid.email === undefined) {
                if(email.length > 0) {
                    if(!regex.test(email)) {
                        setIsValid((prevState) => ({...prevState, email: false}));
                    } else {
                        setIsValid((prevState) => ({...prevState, email: true}));
                    }
                }
            }
            if(isValid.password === undefined) {
                if(password.length > 0) {
                    if(password.length < 3) {
                        setIsValid((prevState) => ({...prevState, password: false}));
                    } else {
                        setIsValid((prevState) => ({...prevState, password: true}));
                    }
                }
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [email, password]);

    return (
        <Box sx={{
            width: {xs: "85%", sm: "60%", md: "45%", lg: "35%" },
            height: '500px',
            margin: "auto",
        }}>
            <Paper elevation={10} sx={{
                padding: '10px',
                width: '100%',
                height: '100%',
                }}>
                <Grid align="center" sx={{marginBottom: '20px'}}>
                    <Avatar sx={{ m: 3, bgcolor: '#1bbd7e' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h4">Sign In</Typography>
                </Grid>
                <Grid align="center">
                    <div style={{width: '80%', marginBottom: 20}}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            {...(isValid.email === false && {error: true, helperText: "Invalid email"})}
                            placeholder="example@mail.com"
                            variant="standard"
                            value={email}
                            onChange={handleEmail}
                        />
                    </div>
                    <div style={{width: '80%', marginBottom: 20}}>
                        <FormControl
                            fullWidth
                            variant="standard" 
                            {...(isValid.password === false && {error: true})} >
                            <InputLabel htmlFor='password' required>
                                Password
                            </InputLabel>
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePassword}
                                onKeyDown={handleSubmit}
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
                            />
                            {isValid.password === false && <FormHelperText>Invalid password</FormHelperText>}
                        </FormControl>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{
                                backgroundColor: '#1bbd7e',
                                color: 'white',
                                width: '80%',
                                height: 50,
                                marginTop: 40,
                                marginBottom: 20,
                            }}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                    </div>
                </Grid>
                <Grid align="center" sx={{marginTop: '10px'}}>
                    <Typography>
                        Don't have an account? <NavLink style={{ textDecoration: 'none', fontWeight: 'bold'}} to="/signup">Sign Up</NavLink>
                    </Typography>
                </Grid>
            </Paper>
        </Box>
    )
}

export default Signin;