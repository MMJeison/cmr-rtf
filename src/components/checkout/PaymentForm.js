import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { previousStep } from "../../store/slices/checkoutSlice";
import { setPaymentData, endCheckout, setIsValidPaymentData } from "../../store/slices/checkoutSlice";
import { clearCart } from "../../store/slices/shoppingCartSlice";

import { SwalMessage } from "../../assets/swalmessage/SwalMessage";

import {
    Button,
    Grid,
    Box,
    TextField,
    Typography,
} from "@mui/material";

const cardsLogo = [
    "amex",
    "cirrus",
    "diners",
    "dankort",
    "discover",
    "jcb",
    "maestro",
    "mastercard",
    "visa",
    "visaelectron",
];

function delSpacesAndLetters(value) {
    return value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
}

//dar formato de numero de tarjeta de credito

function cardFormat(value) {
    let res = '';
    for(let i = 0; i < value.length; i++){
        if(i % 4 === 0 && i !== 0) res += ' ';
        res += value[i];
    }
    return res;
}


const PaymentForm = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const checkout = useSelector(state => state.checkout);
    console.log('checkout');
    console.log(checkout);

    const handlePreviousStep = (e) => {
        e.preventDefault();
        dispatch(previousStep());
    };


    const handleFinishPayment = (e) => {
        e.preventDefault();
        let b = true;
        for(let key in checkout.isValidPaymentData){
            if(checkout.isValidPaymentData[key] === undefined){
                b = false;
                dispatch(setIsValidPaymentData({
                    type: key,
                    value: false
                    }));
                return;
            }
            if(!checkout.isValidPaymentData[key]){
                b = false;
                dispatch(setIsValidPaymentData({
                    type: key,
                    value: false
                    }));
                return;
            }
        }
        if(b){
            dispatch(endCheckout());
            dispatch(clearCart());
            SwalMessage("Payment completed", "Your payment has been completed successfully", "success", false, 3000);
            navigate('/home');
        }
    };

    return (
        <form autoComplete="off">
            <Grid container spacing={2} sx={{
                width: "90%",
                margin: "10px auto",
            }}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h2" sx={{
                        textAlign: "center",
                    }}>
                        Payment Information
                    </Typography>
                </Grid>
                <Grid container item xs={12}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        width: { xs: "100%", sm: "80%" },
                        margin: "0 auto",
                        padding: "10px 0",
                    }}>
                    {cardsLogo.map(im => <img key={im} src={`./cards/${im}.png`} alt={im} width="50px" align="bottom" style={{ padding: "0 5px" }} />)}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="nameOnCard"
                        name="nameOnCard"
                        label="Name on card"
                        value={checkout.paymentData.nameOnCard}
                        {...(checkout.isValidPaymentData.nameOnCard === false && {
                            error: true,
                            helperText: "Name on card is required",
                        })}
                        fullWidth
                        onChange={(e) => dispatch(setPaymentData({
                            type: "nameOnCard",
                            value: e.target.value
                        }))}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="cardNumber"
                        name="cardNumber"
                        label="Card number"
                        placeholder="1234 1234 1234 1234"
                        {...(checkout.isValidPaymentData.cardNumber === false && {
                            error: true,
                            helperText: checkout.paymentData.cardNumber.length === 0 ? "Card number is required" : "Card number is invalid",
                        })}
                        value={cardFormat(checkout.paymentData.cardNumber)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => dispatch(setPaymentData({
                            type: "cardNumber",
                            value: delSpacesAndLetters(e.target.value)
                        }))}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="cardExp"
                        name="cardExp"
                        label="Expiry date"
                        type="date"
                        value={checkout.paymentData.cardExp}
                        InputLabelProps={{ shrink: true }}
                        {...(checkout.isValidPaymentData.cardExp === false && {
                            error: true,
                            helperText: checkout.paymentData.cardExp.length === 0 ? "Expiry date is required" : "Expiry date is invalid",
                        })}
                        fullWidth
                        onChange={(e) => dispatch(setPaymentData({
                            type: "cardExp",
                            value: e.target.value
                        }))}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="cardCvv"
                        name="cardCvv"
                        label="CVV"
                        placeholder="000"
                        value={checkout.paymentData.cardCvv}
                        {...(checkout.isValidPaymentData.cardCvv === false && {
                            error: true,
                            helperText: checkout.paymentData.cardCvv.length === 0 ? "CVV is required" : "CVV is invalid",
                        })}
                        fullWidth
                        onChange={(e) => dispatch(setPaymentData({
                            type: "cardCvv",
                            value: delSpacesAndLetters(e.target.value)
                        }))}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        width: '100%',
                        margin: "20px auto",
                    }}>
                        <Button variant="contained" type="submit" onClick={handlePreviousStep}>
                            Back
                        </Button>
                        <Button variant="contained" type="submit" onClick={handleFinishPayment} >
                            Finish Payment
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default PaymentForm;