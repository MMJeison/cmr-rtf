import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { endCheckout, previousStep } from "../../store/slices/checkoutSlice";
import axios from "axios";

import { clearCart } from "../../store/slices/shoppingCartSlice";

import { SwalMessage } from "../../assets/swalmessage/SwalMessage";

import { BASE_URL_ORDERS } from "../../assets/urls/urls";

import {
    Box,
    Grid,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

function cardFormat(value) {
    let res = '';
    for (let i = 0; i < value.length; i++) {
        if (i % 4 === 0 && i !== 0) res += ' ';
        res += value[i];
    }
    return res;
}

const Review = ({ shoppingCart, checkout }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePreviousStep = () => {
        dispatch(previousStep());
    };

    const handleFinishPayment = async () => {
        console.log(shoppingCart);
        const order = {
            //id: Math.floor(Math.random() * 1000000),
            userId: checkout.user.id,
            date: new Date().toLocaleString(),
            products: [shoppingCart.shoppingCart.map((product) => {
                return {
                    id: product.id,
                    quantity: product.quantity,
                };
            })],
            // total: shoppingCart.total,
            // holder: {
            //     name: checkout.customerData.firstName,
            //     email: checkout.customerData.email,
            //     address: checkout.customerData.address,
            //     city: checkout.customerData.city,
            //     zip: checkout.customerData.zip,
            //     country: checkout.customerData.country,
            // }
        };
        console.log(order);
        await axios.post(BASE_URL_ORDERS, order)
        .then((res) => {
            console.log(res);
            SwalMessage("Success", "Order created", "success", false, 2000);
            //SwalMessage('Success', 'Payment', 'Payment completed successfully', fasle, 2000);
            dispatch(clearCart());
            dispatch(endCheckout());
            navigate('/home');
        }).catch((err) => {
            console.log(err);
            SwalMessage('error', 'Payment', 'Payment failed');
        });
    };
    return (
        <Box sx={{
            padding: "10px 50px",
        }}>
            <Typography variant="h5" gutterBottom >
                Order summary
            </Typography>
            <List disablePadding>
                {shoppingCart.shoppingCart.map((item) => (
                    <ListItem style={{ padding: '10px 0' }} key={item.id}>
                        <Grid container>
                            <Grid item xs={12} sm={10}>
                                <ListItemText primary={item.product.title} secondary={`Quantity: ${item.quantity}`} />
                            </Grid>
                            <Grid item xs={12} sm={2} >
                                <Box sx={{
                                    paddingLeft: "10px",
                                }}>
                                    <Typography sx={{
                                        textAlign: "right",
                                    }}>
                                        Sub total
                                    </Typography>
                                    <Typography sx={{ textAlign: "right", fontWeight: 700 }}>
                                        {`$${(item.product.price * item.quantity).toFixed(2)}`}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '10px 0' }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                        {shoppingCart.total.toFixed(2)}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>

                    <Typography variant="h6" gutterBottom >
                        Shipping
                    </Typography>
                    <Typography gutterBottom >{checkout.customerData.firstName + checkout.customerData.lastName}</Typography>
                    <Typography gutterBottom >{checkout.customerData.email}</Typography>
                    <Typography gutterBottom >{checkout.customerData.address}</Typography>
                    <Typography gutterBottom >{`${checkout.customerData.city}, ${checkout.customerData.zip}, ${checkout.customerData.country}`}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom >
                        Payment details
                    </Typography>
                    <Grid container>
                        <Grid item xs={12} sm={4}>
                            <Typography gutterBottom >Card holder</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography gutterBottom >{checkout.paymentData.nameOnCard}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography gutterBottom >Card number</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography gutterBottom >{cardFormat(checkout.paymentData.cardNumber)}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography gutterBottom >Expiry date</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography gutterBottom >{checkout.paymentData.cardExp}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography gutterBottom >CVV</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography gutterBottom >{checkout.paymentData.cardCvv}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    width: '100%',
                    margin: "20px auto",
                }}>
                    <Button variant="contained" onClick={handlePreviousStep}>
                        Back
                    </Button>
                    <Button variant="contained" onClick={handleFinishPayment} >
                        Pay
                    </Button>
                </Box>
            </Grid>
        </Box>
    );
}

export default Review;