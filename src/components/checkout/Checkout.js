import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { startCheckout } from "../../store/slices/checkoutSlice";
import { NavLink } from "react-router-dom";

import {
    Box,
    Grid,
    Container,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Button,
} from "@mui/material";

import CheckoutAppBar from "./AppBar";
import StepperIcons from "./StepperIcons";
import SelectItems from "./SelectItems";
import ContactForm from "./ContactForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

const Checkout = () => {
    const checkoutState = useSelector(state => state.checkout);
    const shoppingCartState = useSelector(state => state.shoppingCart);
    const oauthState = useSelector(state => state.oauth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startCheckout({ user: oauthState.user }));
    }, [dispatch, oauthState.user]);

    return (
        <div style={{ flexGrow: 1 }}>
            <CheckoutAppBar title="Checkout" />
            <Box component="main" sx={{
                marginBottom: "55px",
                minHeight: "calc(26vh + 260px)",
            }}>
                <Container maxWidth="md" sx={{
                    position: "relative",
                    zIndex: "1100",
                    marginTop: "-110px",
                    marginBottom: "45px",
                }}>
                    <Paper elevation={5} sx={{
                        padding: "15px",
                    }}>
                        <Stepper activeStep={checkoutState.step} sx={{
                            width: "90%",
                            margin: "10px auto",
                            height: "calc(10vh - 40px)",
                            minHeight: "55px",
                            alignItems: "center",
                        }}>
                            {[1, 2, 3, 4].map(e =>
                                <Step key={e}>
                                    <StepLabel StepIconComponent={StepperIcons} />
                                </Step>
                            )}
                        </Stepper>
                        {shoppingCartState.shoppingCart.length > 0 ?
                            checkoutState.step === 0 ? (
                                <SelectItems shoppingCart={shoppingCartState} />
                            ) : checkoutState.step === 1 ? <ContactForm checkout={checkoutState} /> :
                            checkoutState.step === 2 ? <PaymentForm checkout={checkoutState} /> : 
                                <Review shoppingCart={shoppingCartState} checkout={checkoutState} /> : (
                                <Grid container spacing={1} sx={{
                                    width: "90%",
                                    margin: "10px auto",
                                }}>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" component="h2" sx={{
                                            textAlign: "center",
                                        }}>
                                            Your shopping cart is empty
                                        </Typography>
                                    </Grid>
                                    <NavLink to={`/home`} style={{
                                        textDecoration: "none",
                                        width: '40%',
                                        margin: '30px auto',
                                    }}>
                                        <Button variant="contained" color="secondary" sx={{
                                            width: '100%',
                                        }}>
                                            Back to Home
                                        </Button>
                                    </NavLink>
                                </Grid>
                            )}
                    </Paper>
                </Container>
            </Box>
        </div>
    );
};

export default Checkout;