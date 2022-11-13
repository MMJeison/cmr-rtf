import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSignin } from '../../store/slices/oauthSlice';

import {
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
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

let timer = null;

const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = () => {
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
        <Grid>
            <Paper elevation={10} style={{
                padding: 10, 
                width: '25vw', 
                minWidth: 270, 
                height: '65vh',
                minHeight: 450,
                margin: '13vh auto',
                }}>
                <Grid align="center">
                    <Avatar sx={{ m: 3, bgcolor: '#1bbd7e' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2>Sign In</h2>
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
            </Paper>
        </Grid>
    )
}

export default Login;