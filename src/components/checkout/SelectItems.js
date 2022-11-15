import { useDispatch } from "react-redux";

import { setProducts, nextStep } from "../../store/slices/checkoutSlice";

import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Box,
    Typography,
    CardActions,
    Button,
} from "@mui/material";

import ButtonDeleteFromCart from "../buttons/ButtonDeleteFromCart";
import { NavLink } from "react-router-dom";

const SelectItems = ({ shoppingCart }) => {
    const dispatch = useDispatch();
    const handleNext = () => {
        dispatch(setProducts({products: shoppingCart.shoppingCart}));
        dispatch(nextStep());
    };
    return (
        <Grid container>
            <Grid item xs={12} sm={8} sx={{
                margin: "15px 0",
            }}>
                {shoppingCart.shoppingCart.map((item) => (
                    <Card key={item.id} sx={{ display: 'flex', margin: 1 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 80, margin: 1 }}
                            image={item.product.image}
                            alt={item.product.title}
                        />
                        <Box sx={{ width: '100%', padding: '0', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography gutterBottom variant="h7    " component="div">
                                    {item.product.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {`Price: $${item.product.price.toFixed(2)}`}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {`Units: ${item.quantity}`}
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', pl: 1, pb: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {Array(5).fill().map((_, i) => (
                                        i < item.product.rating.rate ? (
                                            <p key={i}>&#11088;</p>) : (
                                            <p key={i}>&#9734;</p>
                                        )
                                    ))}
                                </Box>
                                <ButtonDeleteFromCart item={item} />
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Grid>
            <Grid item xs={12} sm={4}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Shopping Cart
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {`Items: ${shoppingCart.totalItems}`}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {`Total: $${shoppingCart.total.toFixed(2)}`}
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}>
                    <Button variant="contained" color="primary" sx={{
                        width: '80%',
                    }} onClick={handleNext} >
                        Next
                    </Button>
                    <NavLink to={`/home`} style={{
                        textDecoration: "none",
                        width: '80%',
                    }}>
                        <Button variant="contained" color="secondary" sx={{
                            width: '100%',
                        }}>
                            Back to Home
                        </Button>
                    </NavLink>
                </CardActions>
            </Grid>
        </Grid>
    );
};

export default SelectItems;