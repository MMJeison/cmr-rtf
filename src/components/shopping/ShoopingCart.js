import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Box,
    Menu,
    MenuItem,
    Typography,
    IconButton,
    Badge,
    Tooltip,
    Button,
} from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import ShoppingCartItem from './ShoppingCartItem';

const ShoppingCart = () => {
    const [anchorElCart, setAnchorElCart] = useState(null);
    const shoppingCart = useSelector(state => state.shoppingCart);

    const handleOpenCartMenu = (event) => {
        setAnchorElCart(event.currentTarget);
    };

    const handleCloseCartMenu = () => {
        setAnchorElCart(null);
    };

    return (
        <Box sx={{ pr: '1vw' }}>
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
                    height: '70ch'
                }}
            >
                {shoppingCart.shoppingCart.length > 0 && shoppingCart.shoppingCart.map((item) => (
                    <MenuItem key={item.product.id}>
                        <ShoppingCartItem item={item} />
                    </MenuItem>
                ))}
                {shoppingCart.shoppingCart.length > 0 && (
                    <MenuItem key={-1} >
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems:'center'}}>
                            <Typography variant="h7" sx={{ fontWeight: 'bold' }}>
                                Total: ${shoppingCart.total.toFixed(2)}
                            </Typography>
                            <NavLink to="/checkout" style={{textDecoration: 'none'}}>
                                <Button variant="contained" color="primary" sx={{width: '150px'}}>
                                    {'Checkout'}
                                </Button>
                            </NavLink>
                        </Box>
                    </MenuItem>
                )}
                {shoppingCart.shoppingCart.length === 0 && (
                    <MenuItem key={-1}>
                        <Typography variant='h6' textAlign="center">Your cart is empty</Typography>
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
}

export default ShoppingCart;