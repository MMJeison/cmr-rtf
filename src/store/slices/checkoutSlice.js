import { createSlice } from "@reduxjs/toolkit";

// Checkout slice

const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const initialState = {
    isInProgress: false,
    user: null,
    step: 0,
    products: [],
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
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        address: undefined,
        city: undefined,
        state: undefined,
        zip: undefined,
        country: undefined,
    },
    paymentData: {
        nameOnCard: "",
        cardNumber: "",
        cardExp: "",
        cardCvv: "",
    },
    isValidPaymentData: {
        nameOnCard: undefined,
        cardNumber: undefined,
        cardExp: undefined,
        cardCvv: undefined,
    },
};


const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        startCheckout: (state, action) => {
            console.log(state.isInProgress);
            if (state.isInProgress) {
                console.log("Checkout already in progress");
                if (state.user?.id !== action.payload.user.id) {
                    console.log("The user has changed, resetting the checkout");
                    console.log(initialState);
                    state = initialState;
                }
            } else {
                console.log("Starting checkout");
                state.user = action.payload.user;
                state.isInProgress = true;
            }
        },
        endCheckout: (state) => {
            console.log("Ending checkout");
            console.log(initialState);
            state.isInProgress = false;
            state.user = null;
            state.step = 0;
            state.products = [];
            state.customerData = initialState.customerData;
            state.isValidCustomerData = initialState.isValidCustomerData;
            state.paymentData = initialState.paymentData;
            state.isValidPaymentData = initialState.isValidPaymentData;
        },
        setProducts: (state, action) => {
            state.products = action.payload.products;
        },
        setCustomerData: (state, action) => {
            if (action.payload.type) {
                switch (action.payload.type) {
                    case "firstName":
                        state.customerData.firstName = action.payload.value;
                        if (action.payload.value.trim().length > 0) {
                            state.isValidCustomerData.firstName = true;
                        } else {
                            state.isValidCustomerData.firstName = undefined;
                        }
                        break;
                    case "lastName":
                        state.customerData.lastName = action.payload.value;
                        if (action.payload.value.trim().length > 0) {
                            state.isValidCustomerData.lastName = true;
                        } else {
                            state.isValidCustomerData.lastName = undefined;
                        }
                        break;
                    case "email":
                        state.customerData.email = action.payload.value;
                        if (regex.test(action.payload.value)) {
                            state.isValidCustomerData.email = true;
                        } else {
                            state.isValidCustomerData.email = undefined;
                        }
                        break;
                    case "address":
                        state.customerData.address = action.payload.value;
                        if (action.payload.value.trim().length > 0) {
                            state.isValidCustomerData.address = true;
                        } else {
                            state.isValidCustomerData.address = undefined;
                        }
                        break;
                    case "city":
                        state.customerData.city = action.payload.value;
                        if (action.payload.value.trim().length > 0) {
                            state.isValidCustomerData.city = true;
                        } else {
                            state.isValidCustomerData.city = undefined;
                        }
                        break;
                    case "state":
                        state.customerData.state = action.payload.value;
                        if (action.payload.value.trim().length > 0) {
                            state.isValidCustomerData.state = true;
                        } else {
                            state.isValidCustomerData.state = undefined;
                        }
                        break;
                    case "zip":
                        state.customerData.zip = action.payload.value;
                        if (state.customerData.zip.length > 3) {
                            state.isValidCustomerData.zip = true;
                        } else {
                            state.isValidCustomerData.zip = undefined;
                        }
                        break;
                    case "country":
                        state.customerData.country = action.payload.value;
                        if (action.payload.value.trim().length > 0) {
                            state.isValidCustomerData.country = true;
                        } else {
                            state.isValidCustomerData.country = undefined;
                        }
                        break;
                    default:
                        break;
                }
            } else {
                state.customerData = action.payload.customerData;
            }
        },
        setIsValidCustomerData: (state, action) => {
            if (action.payload.type) {
                switch (action.payload.type) {
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
            } else {
                state.isValidCustomerData = action.payload.isValidCustomerData;
            }
        },
        setPaymentData: (state, action) => {
            if (action.payload.type) {
                switch (action.payload.type) {
                    case "nameOnCard":
                        if (state.paymentData.nameOnCard.length === 0 &&
                            action.payload.value.trim().length === 0) {
                            state.isValidPaymentData.nameOnCard = undefined;
                            break;
                        }
                        state.paymentData.nameOnCard = action.payload.value;
                        if (action.payload.value.length === 0) {
                            state.isValidPaymentData.nameOnCard = undefined;
                        } else {
                            state.isValidPaymentData.nameOnCard = true;
                        }
                        break;
                    case "cardNumber":
                        if (state.paymentData.cardNumber.length === 16
                            && action.payload.value.length === 17) {
                            break;
                        }
                        state.paymentData.cardNumber = action.payload.value;
                        if (action.payload.value.length === 16) {
                            state.isValidPaymentData.cardNumber = true;
                        } else {
                            state.isValidPaymentData.cardNumber = undefined;
                        }
                        break;
                    case "cardExp":
                        state.paymentData.cardExp = action.payload.value;
                        if (action.payload.value.length > 0) {
                            state.isValidPaymentData.cardExp = true;
                        } else {
                            state.isValidPaymentData.cardExp = undefined;
                        }
                        break;
                    case "cardCvv":
                        if (state.paymentData.cardCvv.length === 3
                            && action.payload.value.length === 4) {
                            break;
                        }
                        state.paymentData.cardCvv = action.payload.value;
                        if (action.payload.value.length === 3) {
                            state.isValidPaymentData.cardCvv = true;
                        } else {
                            state.isValidPaymentData.cardCvv = undefined;
                        }
                        break;
                    default:
                        break;
                }
            } else {
                state.paymentData = action.payload.paymentData;
            }
        },
        setIsValidPaymentData: (state, action) => {
            if (action.payload.type) {
                switch (action.payload.type) {
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
            } else {
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
            if (state.step > 0) {
                state.step--;
            }
        },
    },
});

export const {
    startCheckout,
    endCheckout,
    setProducts,
    setCustomerData,
    setIsValidCustomerData,
    setPaymentData,
    setIsValidPaymentData,
    setStep,
    nextStep,
    previousStep
} = checkoutSlice.actions;

export default checkoutSlice.reducer;