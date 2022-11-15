import { useDispatch } from "react-redux";
import { setCustomerData, setIsValidCustomerData } from "../../store/slices/checkoutSlice";
import { previousStep, nextStep } from "../../store/slices/checkoutSlice";

import {
    Button,
    Grid,
    TextField,
    Typography,
} from "@mui/material";

function delSpacesAndLetters(value) {
    return value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
}

const ContactForm = ({ checkout }) => {
    const dispatch = useDispatch();

    const handlePreviousStep = (e) => {
        e.preventDefault();
        dispatch(previousStep());
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        let valid = true;
        let keyStr = '';
        console.log('start');
        console.log(checkout.isValidCustomerData);
        console.log('end');
        for (let key in checkout.isValidCustomerData) {
            if (!checkout.isValidCustomerData[key]) {
                valid = false;
                if (keyStr === '') {
                    keyStr = key;
                }
                break;
            }
        }
        if (valid) {
            dispatch(nextStep());
        } else {
            dispatch(setIsValidCustomerData({
                type: keyStr,
                value: false,
            }));
        }
    };

    return (
        <Grid container spacing={2} sx={{
            width: "90%",
            margin: "10px auto",
        }}>
            <Grid item xs={12}>
                <Typography variant="h4" component="h2" sx={{
                    textAlign: "center",
                }}>
                    Contact Information
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    value={checkout.customerData.firstName}
                    {...(checkout.isValidCustomerData.firstName === false && {
                        error: true,
                        helperText: "Please enter your first name",
                    })}
                    fullWidth
                    onChange={e => dispatch(setCustomerData({ type: 'firstName', value: e.target.value }))}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    value={checkout.customerData.lastName}
                    {...(checkout.isValidCustomerData.lastName === false && {
                        error: true,
                        helperText: "Please enter your last name",
                    })}
                    fullWidth
                    onChange={e => dispatch(setCustomerData({ type: 'lastName', value: e.target.value }))}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    value={checkout.customerData.email}
                    {...(checkout.isValidCustomerData.email === false && {
                        error: true,
                        helperText: "Please enter a valid email address",
                    })}
                    fullWidth
                    onChange={e => dispatch(setCustomerData({ type: 'email', value: e.target.value.trim().toLowerCase() }))}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    value={checkout.customerData.address}
                    {...(checkout.isValidCustomerData.address === false && {
                        error: true,
                        helperText: "Please enter your address",
                    })}
                    fullWidth
                    onChange={e => dispatch(setCustomerData({ type: 'address', value: e.target.value }))}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    value={checkout.customerData.city}
                    {...(checkout.isValidCustomerData.city === false && {
                        error: true,
                        helperText: "Please enter your city",
                    })}
                    fullWidth
                    onChange={e => dispatch(setCustomerData({ type: 'city', value: e.target.value }))}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    value={checkout.customerData.state}
                    {...(checkout.isValidCustomerData.state === false && {
                        error: true,
                        helperText: "Please enter your state",
                    })}
                    fullWidth
                    onChange={e => dispatch(setCustomerData({ type: 'state', value: e.target.value }))}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    value={checkout.customerData.zip}
                    placeholder={"000000"}
                    {...(checkout.isValidCustomerData.zip === false && {
                        error: true,
                        helperText: "Please enter your zip code",
                    })}
                    fullWidth
                    onChange={e => dispatch(setCustomerData({ type: 'zip', value: delSpacesAndLetters(e.target.value) }))}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    value={checkout.customerData.country}
                    {...(checkout.isValidCustomerData.country === false && {
                        error: true,
                        helperText: "Please enter your country",
                    })}
                    fullWidth
                    onChange={e => dispatch(setCustomerData({ type: 'country', value: e.target.value }))}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" type="submit" onClick={handlePreviousStep}>
                    Back
                </Button>
                <Button variant="contained" type="submit" onClick={handleNextStep} sx={{
                    float: "right",
                }}>
                    Next
                </Button>
            </Grid>
        </Grid>
    );
};

export default ContactForm;