import { createSlice } from "@reduxjs/toolkit";

// Checkout slice

const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        isInProgress: false,
        user: null,
        step: 0,
        customerData: {
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            country: "",
        },
        isValidCustomerData: {
            firstName: -1,
            lastName: -1,
            email: -1,
            address: -1,
            city: -1,
            state: -1,
            zip: -1,
            country: -1,
        },
        paymentData: {
            nameOnCard: "",
            cardNumber: "",
            cardExp: "",
            cardCvv: "",
        },
        isValidPaymentData: {
            nameOnCard: -1,
            cardNumber: -1,
            cardExp: -1,
            cardCvv: -1,
        },
    },
    reducers: {
        startCheckout: (state, action) => {
            if(state.isInProgress) {
                if(state.user?.id !== action.payload.user.id) {
                    state.user = null;
                    state.step = 0;
                    state.customerData = {
                        firstName: "",
                        lastName: "",
                        email: "",
                        address: "",
                        city: "",
                        state: "",
                        zip: "",
                        country: "",
                    };
                    state.isValidCustomerData = {
                        firstName: -1,
                        lastName: -1,
                        email: -1,
                        address: -1,
                        city: -1,
                        state: -1,
                        zip: -1,
                        country: -1,
                    };
                    state.paymentData = {
                        nameOnCard: "",
                        cardNumber: "",
                        cardExp: "",
                        cardCvv: "",
                    };
                    state.isValidPaymentData = {
                        nameOnCard: -1,
                        cardNumber: -1,
                        cardExp: -1,
                        cardCvv: -1,
                    };
                }
            }
            state.user = action.payload.user;
            state.isInProgress = true;
        },
        endCheckout: (state) => {
            state.isInProgress = false;
            state.user = null;
            state.step = 0;
            state.customerData = {
                firstName: "",
                lastName: "",
                email: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                country: "",
            };
            state.isValidCustomerData = {
                firstName: -1,
                lastName: -1,
                email: -1,
                address: -1,
                city: -1,
                state: -1,
                zip: -1,
                country: -1,
            };
            state.paymentData = {
                nameOnCard: "",
                cardNumber: "",
                cardExp: "",
                cardCvv: "",
            };
            state.isValidPaymentData = {
                nameOnCard: -1,
                cardNumber: -1,
                cardExp: -1,
                cardCvv: -1,
            };
        },
        setCustomerData: (state, action) => {
            if(action.payload.type){
                switch(action.payload.type){
                    case "firstName":
                        state.customerData.firstName = action.payload.value;
                        if(action.payload.value.trim().length > 0){
                            state.isValidCustomerData.firstName = 1;
                        }else{
                            state.isValidCustomerData.firstName = -1;
                        }
                        break;
                    case "lastName":
                        state.customerData.lastName = action.payload.value;
                        if(action.payload.value.trim().length > 0){
                            state.isValidCustomerData.lastName = 1;
                        }else{
                            state.isValidCustomerData.lastName = -1;
                        }
                        break;
                    case "email":
                        state.customerData.email = action.payload.value;
                        if(regex.test(action.payload.value)){
                            state.isValidCustomerData.email = 1;
                        }else{
                            state.isValidCustomerData.email = -1;
                        }
                        break;
                    case "address":
                        state.customerData.address = action.payload.value;
                        if(action.payload.value.trim().length > 0){
                            state.isValidCustomerData.address = 1;
                        }else{
                            state.isValidCustomerData.address = -1;
                        }
                        break;
                    case "city":
                        state.customerData.city = action.payload.value;
                        if(action.payload.value.trim().length > 0){
                            state.isValidCustomerData.city = 1;
                        }else{
                            state.isValidCustomerData.city = -1;
                        }
                        break;
                    case "state":
                        state.customerData.state = action.payload.value;
                        if(action.payload.value.trim().length > 0){
                            state.isValidCustomerData.state = 1;
                        }else{
                            state.isValidCustomerData.state = -1;
                        }
                        break;
                    case "zip":
                        state.customerData.zip = action.payload.value;
                        if(state.customerData.zip.length > 3){
                            state.isValidCustomerData.zip = 1;
                        }else{
                            state.isValidCustomerData.zip = -1;
                        }
                        break;
                    case "country":
                        state.customerData.country = action.payload.value;
                        if(action.payload.value.trim().length > 0){
                            state.isValidCustomerData.country = 1;
                        }else{
                            state.isValidCustomerData.country = -1;
                        }
                        break;
                    default:
                        break;
                }
            }else{
                state.customerData = action.payload.customerData;
            }
        },
        setIsValidCustomerData: (state, action) => {
            if(action.payload.type){
                switch(action.payload.type){
                    case "firstName":
                        state.isValidCustomerData.firstName = action.payload.value;
                        break;
                    case "lastName":
                        state.isValidCustomerData.lastName = action.payload.value;
                        break;
                    case "email":
                        state.isValidCustomerData.email = action.payload.value;
                        break;
                    case "address":
                        state.isValidCustomerData.address = action.payload.value;
                        break;
                    case "city":
                        state.isValidCustomerData.city = action.payload.value;
                        break;
                    case "state":
                        state.isValidCustomerData.state = action.payload.value;
                        break;
                    case "zip":
                        state.isValidCustomerData.zip = action.payload.value;
                        break;
                    case "country":
                        state.isValidCustomerData.country = action.payload.value;
                        break;
                    default:
                        break;
                }
            }else{
                state.isValidCustomerData = action.payload.isValidCustomerData;
            }
        },
        setPaymentData: (state, action) => {
            if(action.payload.type){
                switch(action.payload.type){
                    case "nameOnCard":
                        if(state.paymentData.nameOnCard.length === 0 &&
                            action.payload.value.trim().length === 0){
                            state.isValidPaymentData.nameOnCard = -1;
                            break;
                        }
                        state.paymentData.nameOnCard = action.payload.value;
                        if(action.payload.value.length === 0){
                            state.isValidPaymentData.nameOnCard = -1;
                        }else{
                            state.isValidPaymentData.nameOnCard = 1;
                        }
                        break;
                    case "cardNumber":
                        if(state.paymentData.cardNumber.length === 16
                            && action.payload.value.length === 17){
                            break;
                        }
                        state.paymentData.cardNumber = action.payload.value;
                        if(action.payload.value.length === 16){
                            state.isValidPaymentData.cardNumber = 1;
                        }else{
                            state.isValidPaymentData.cardNumber = -1;
                        }
                        break;
                    case "cardExp":
                        state.paymentData.cardExp = action.payload.value;
                        if(action.payload.value.length > 0){ 
                            state.isValidPaymentData.cardExp = 1;
                        }else{
                            state.isValidPaymentData.cardExp = -1;
                        }
                        break;
                    case "cardCvv":
                        if(state.paymentData.cardCvv.length === 3
                            && action.payload.value.length === 4){
                            break;
                        }
                        state.paymentData.cardCvv = action.payload.value;
                        if(action.payload.value.length === 3){
                            state.isValidPaymentData.cardCvv = 1;
                        }else{
                            state.isValidPaymentData.cardCvv = -1;
                        }
                        break;
                    default:
                        break;
                }
            }else{
                state.paymentData = action.payload.paymentData;
            }
        },
        setIsValidPaymentData: (state, action) => {
            if(action.payload.type){
                switch(action.payload.type){
                    case "nameOnCard":
                        state.isValidPaymentData.nameOnCard = action.payload.value;
                        break;
                    case "cardNumber":
                        state.isValidPaymentData.cardNumber = action.payload.value;
                        break;
                    case "cardExp":
                        state.isValidPaymentData.cardExp = action.payload.value;
                        break;
                    case "cardCvv":
                        state.isValidPaymentData.cardCvv = action.payload.value;
                        break;
                    default:
                        break;
                }
            }else{
                state.isValidPaymentData = action.payload.isValidPaymentData;
            }
        },
        setStep: (state, action) => {
            state.step = action.payload.step;
        },
        nextStep: (state) => {
            state.step++;
        },
        previousStep: (state) => {
            if(state.step > 0) {
                state.step--;
            }
        },
    },
});

export const {
    startCheckout,
    endCheckout,
    setCustomerData,
    setIsValidCustomerData,
    setPaymentData,
    setIsValidPaymentData,
    setStep,
    nextStep,
    previousStep
} = checkoutSlice.actions;

export default checkoutSlice.reducer;