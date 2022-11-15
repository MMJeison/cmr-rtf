import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL_CATEGORIES } from "../../assets/urls/urls";

// Categories slice

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        return await axios.get(BASE_URL_CATEGORIES, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        }).then((response) => {
            const categories = [];
            response.data.forEach((category) => {
                categories.push(category.trim().replace(/\s+/g, "+"));
            });
            return categories;
        }).catch((error) => {
            return error;
        });
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchCategories.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        [fetchCategories.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    },
});

export default categoriesSlice.reducer;