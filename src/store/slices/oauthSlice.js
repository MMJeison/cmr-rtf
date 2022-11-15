import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { BASE_URL_USERS } from '../../assets/urls/urls';

import { SwalMessage } from '../../assets/swalmessage/SwalMessage';

export const fetchSignin = createAsyncThunk(
    'oauth/login',
    async (dataUser, { rejectWithValue }) => {
        return await axios.get(BASE_URL_USERS).then((response) => {
            const user = response.data.find(user => user.email === dataUser.email);
            if(user) {
                if(user.password === dataUser.password) {
                    SwalMessage("Success", "Login success", "success", false, 2000);
                    return user;
                } else {
                    SwalMessage("Error", "Incorrect password", "error", true, 4000);
                    return rejectWithValue('Incorrect password');
                }
            } else {
                SwalMessage("Error", "User not found", "error", true, 4000);
                return rejectWithValue('User not found');
            }
        }).catch((error) => {
            const text = error?.message || 'Something went wrong';
            SwalMessage("Something went wrong", text, "error", true, 4000);
            return rejectWithValue(text);
        })
    }
);

const oauthSlice = createSlice({
    name: 'oauth',
    initialState: {},
    reducers: {
        logout: (state, action) => {
            state.user = null;
        }
    },
    extraReducers: {
        [fetchSignin.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchSignin.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        [fetchSignin.rejected]: (state, action) => {
            state.loading = false;
            state.user = null;
        }
    }
});

export const { logout } = oauthSlice.actions;

export default oauthSlice.reducer;