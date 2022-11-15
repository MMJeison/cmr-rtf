import { createSlice } from "@reduxjs/toolkit";

// Shopping cart slice

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {
        shoppingCart: [],
        total: 0,
        totalItems: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const { product, qtity } = action.payload;
            const prodInCart = state.shoppingCart.find( item => item.id === product.id);
            if (prodInCart) {
                prodInCart.quantity += qtity;
            }
            else {
                state.shoppingCart.push({
                    id: product.id,
                    product,
                    quantity: qtity,
                });
            }
            state.totalItems += qtity;
            state.total += product.price * qtity;
        },
        removeFromCart: (state, action) => {
            const { product, qtity } = action.payload;
            const prodInCart = state.shoppingCart.find( item => item.id === product.id);
            if (prodInCart) {
                prodInCart.quantity -= qtity;
                if (prodInCart.quantity <= 0) {
                    state.totalItems -= (qtity + prodInCart.quantity);
                    state.total -= (qtity + prodInCart.quantity) * product.price;
                    state.shoppingCart = state.shoppingCart.filter( item => item.id !== product.id);
                }else{
                    state.totalItems -= qtity;
                    state.total -= qtity * product.price;
                }
            }
        },
        clearCart: (state) => {
            state.shoppingCart = [];
            state.total = 0;
            state.totalItems = 0;
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;