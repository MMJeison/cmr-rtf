import { createSlice } from "@reduxjs/toolkit";

// Shopping cart slice

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {
        shoppingCart: ['Cart', 'Checkout', 'Orders',],
        total: 150,
        totalItems: 3,
    },
    reducers: {
        addProductToCart: (state, action) => {
            const product = action.payload;
            const productInCart = state.shoppingCart.find((item) => item.id === product.id);
            if (productInCart) {
                productInCart.quantity += 1;
            } else {
                state.shoppingCart.push({ ...product, quantity: 1 });
            }
        },
        removeProductFromCart: (state, action) => {
            const product = action.payload;
            const productInCart = state.shoppingCart.find((item) => item.id === product.id);
            if (productInCart.quantity === 1) {
                state.shoppingCart = state.shoppingCart.filter((item) => item.id !== product.id);
            } else {
                productInCart.quantity -= 1;
            }
        },
        clearCart: (state) => {
            state.shoppingCart = [];
        },
    },
});

export const { addProductToCart, removeProductFromCart, clearCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;