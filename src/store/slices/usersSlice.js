import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL_USERS } from "../../assets/urls/urls";

// Users slice

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async () => {
        return await axios.get(BASE_URL_USERS, {
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

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        [fetchUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    },
});

export default usersSlice.reducer;