import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL_PRODUCTS } from "../../assets/urls/urls";

// Products slice

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        return await axios.get(BASE_URL_PRODUCTS, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            return error;
        });
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    },
});

export default productsSlice.reducer;