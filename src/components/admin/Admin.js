import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/oauthSlice";
import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Box,
    Button,
} from "@mui/material";

import AdbIcon from '@mui/icons-material/Adb';

const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/signin");
    };

    return (
        <Box>
            <AppBar position="static" elevation={0} color="default" sx={{
                Height: "20vh",
                minHeight: "190px",
                paddingTop: 3,
            }}>
                <Grid container alignItems="center">
                    <Grid item>
                        <Box sx={{ margin: 3 }}>
                            <AdbIcon fontSize="large" />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" noWrap color="primary" sx={{
                            flexGrow: 1,
                            alignSelf: 'flex-end',
                            verticalAlign: 'middle',
                            display: 'inline-flex'
                        }}>
                            {'ADMIN DASHBOARD'}
                        </Typography>
                    </Grid>

                </Grid>
                <Toolbar sx={{
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingTop: 3,
                }}>
                    <Box sx={{
                        flexGrow: 1,
                        paddingLeft: '30px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Box>
                            <NavLink to="products" style={({ isActive }) => {
                                return {
                                    textDecoration: 'none',
                                    color: isActive ? 'black' : 'blue',
                                    fontWeight: isActive ? 'bolder' : 'normal',
                                    margin: '0 10px',
                                }
                            }}>
                                <Typography variant="h5" noWrap sx={{
                                    flexGrow: 1,
                                    alignSelf: 'flex-end',
                                    verticalAlign: 'middle',
                                    display: 'inline-flex',
                                }}>
                                    {'PRODUCTS'}
                                </Typography>
                            </NavLink>
                            <NavLink to="users" style={({ isActive }) => {
                                return {
                                    textDecoration: 'none',
                                    color: isActive ? 'black' : 'blue',
                                    fontWeight: isActive ? 'bolder' : 'normal',
                                    margin: '0 10px',
                                }
                            }}>
                                <Typography variant="h5" noWrap sx={{
                                    flexGrow: 1,
                                    alignSelf: 'flex-end',
                                    verticalAlign: 'middle',
                                    display: 'inline-flex',
                                }}>
                                    {'USERS'}
                                </Typography>
                            </NavLink>
                        </Box>
                        <Button variant="contained" onClick={handleLogout} sx={{
                            paddingRight: '20px',
                            marginRight: '30px'
                        }}>
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Box>
    );
};

export default Admin;