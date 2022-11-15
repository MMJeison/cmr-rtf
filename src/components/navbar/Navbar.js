import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/oauthSlice';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { fetchCategories } from '../../store/slices/categoriesSlice';

import { BASE_URL_AVATARS } from '../../assets/urls/urls';

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Tooltip,
    MenuItem,
    InputBase,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCart from '../shopping/ShoopingCart';

// const pages = ['Products', 'Pricing', 'Blog'];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    
    const oauth = useSelector(state => state.oauth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const categories = useSelector(state => state.categories);
    let pages = categories.categories.map(category => {
        return {
            name: category,
            link: `/category/${category}`
        }
    });
    pages.splice(0,0, {name: 'Home', link: '/home'});

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        setAnchorElUser(null);
        dispatch(logout());
    };
    const navigate = useNavigate();
    const handleEnterSearch = (event) => {
        if (event.key === 'Enter') {
            if(event.target.value === "") {
                navigate('/home');
            }else if (event.target.value) {
                navigate(`/search/${event.target.value}`);
            }
        }
    };

    return (
        <AppBar position="static" sx={{height: '90px'}}>
            <Container maxWidth="xl" sx={{ minWidth: 300 }}>
                <Toolbar sx={{ display: { xs: 'flex'}}} >
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between', alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages?.map((page) => (
                                <NavLink to={page.link} key={page.name} style={({ isActive }) => {
                                    return {
                                        textDecoration: 'none',
                                        color: isActive ? 'blue' : 'inherit',
                                    }
                                }}>
                                    <MenuItem onClick={handleCloseNavMenu} sx={{
                                        '&:hover': {
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                        }
                                    }}>
                                        <Typography textAlign="center">{page.name.replace('+', ' ').toUpperCase()}</Typography>
                                    </MenuItem>
                                </NavLink>
                            ))}
                        </Menu>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'rgba(255,255,255,0)' }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        {pages?.map((page) => (
                            <NavLink to={page.link} key={page.name} style={({ isActive }) => {
                                return {
                                    fontWeight: 'bold',
                                    color: isActive ? 'black' : 'inherit',
                                    textDecoration: 'none',
                                    margin: '10px 7px',
                                    display: 'block',
                                }
                            }}>
                                {page.name.replace('+', ' ').toUpperCase()}
                            </NavLink>
                        ))}
                    </Box>
                    <Box sx={{ display: { xs: 'flex'} }}>
                        <Search>
                            <SearchIconWrapper>
                            <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyUp={handleEnterSearch}
                            />
                        </Search>
                    </Box>
                    <ShoppingCart />
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={oauth.user ? oauth.user.username: ""}
                                src={oauth.user ? `${BASE_URL_AVATARS}/${oauth.user.name.firstname}` : ""}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {oauth.user && 
                                [<NavLink key='profile' to="/profile" onClick={handleCloseUserMenu} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <MenuItem sx={{
                                            '&:hover': {
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                            }
                                        }}>
                                            <Typography textAlign="center">Profile</Typography>
                                        </MenuItem>
                                    </NavLink>,
                                    <Link key='logout' to={'/home'} onClick={handleLogout} style={{textDecoration: 'none', color: 'inherit'}}>
                                        <MenuItem sx={{
                                            '&:hover': {
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                            }
                                        }}>
                                            <Typography textAlign="center">Logout</Typography>
                                        </MenuItem>
                                    </Link>]
                            }
                            {!oauth.user && (
                                <Link to={'/signin'} onClick={handleCloseUserMenu} style={{textDecoration: 'none', color: 'inherit'}}>
                                    <MenuItem sx={{
                                        '&:hover': {
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                        }
                                    }}>
                                        <Typography textAlign="center">Login</Typography>
                                    </MenuItem>
                                </Link>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;