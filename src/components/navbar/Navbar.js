import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/oauthSlice';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    InputBase,
    Badge
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const pages = ['Products', 'Pricing', 'Blog'];

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
        width: '30ch',
      },
    },
  }));

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElCart, setAnchorElCart] = useState(null);
    
    const oauth = useSelector(state => state.oauth);
    const shoppingCart = useSelector(state => state.shoppingCart);

    const dispatch = useDispatch();

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

    const handleOpenCartMenu = (event) => {
        setAnchorElCart(event.currentTarget);
    };

    const handleCloseCartMenu = () => {
        setAnchorElCart(null);
    };

    const handleLogout = () => {
        setAnchorElUser(null);
        dispatch(logout());
    };

    return (
        <AppBar position="static" sx={{height: '70px'}}>
            <Container maxWidth="xl" sx={{ minWidth: 300 }}>
                <Toolbar sx={{ display: { xs: 'flex'}}} >
                    <AdbIcon sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' }, justifyContent: 'space-between', alignItems: 'center' }}>
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
                                display: { xs: 'block', sm: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        <AdbIcon sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1 }} />
                        <AdbIcon sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1, color: 'rgba(255,255,255,0)' }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
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
                            />
                        </Search>
                    </Box>
                    <Box sx={{pr: '1vw'}}>
                        <Tooltip title="Shopping Cart">
                            <IconButton onClick={handleOpenCartMenu} size="large" aria-label={`show ${shoppingCart.totalItems} products`} color="inherit">
                                <Badge badgeContent={shoppingCart.totalItems} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElCart}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElCart)}
                            onClose={handleCloseCartMenu}
                            sx={{
                                mt: '45px',
                                mr: 5,
                                minHeight: '200px',
                                height: '50vh'
                            }}
                        >
                            {shoppingCart.shoppingCart.length > 0 && shoppingCart.shoppingCart.map((item) => (
                                <MenuItem key={item} onClick={handleCloseCartMenu}>
                                    <Typography textAlign="center">{item}</Typography>
                                </MenuItem>
                            ))}
                            {shoppingCart.shoppingCart.length === 0 && (
                                <MenuItem onClick={handleCloseCartMenu}>
                                    <Typography textAlign="center">Your cart is empty</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                                        <MenuItem>
                                            <Typography textAlign="center">Profile</Typography>
                                        </MenuItem>
                                    </NavLink>,
                                    <Link key='logout' to={'/home'} onClick={handleLogout} style={{textDecoration: 'none', color: 'inherit'}}>
                                        <MenuItem>
                                            <Typography textAlign="center">Logout</Typography>
                                        </MenuItem>
                                    </Link>]
                            }
                            {!oauth.user && (
                                <Link to={'/signin'} onClick={handleCloseUserMenu} style={{textDecoration: 'none', color: 'inherit'}}>
                                    <MenuItem>
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