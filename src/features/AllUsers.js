import { toast } from "react-toastify";
import customFetch from "../utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {addUserToLocalStorage, addTokenToLocalStorage,removeUserFromLocalStorage, removeTokenFromLocalStorage,getUserFromLocalStorage, getTokenFromLocalStorage} from'../utils/localStorage';


const initialState = {
    isLoading : false,
    userLoading : false,
    users : []
};


export const getAllUsers = createAsyncThunk(
    'users/allUsers',
    async(_, thunkAPI) => {
        try {
            const resp = await customFetch.get('/user',
            {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            });
            return resp.data;
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const updatePassword = createAsyncThunk(
    'user/updateUserPassword',
    async(data, thunkAPI) => {
        try {
            const resp = await customFetch.patch('/user/updateUserPassword', data, {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            });
            console.log(resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)



const allUsersSlice = createSlice({
    name : 'allUsers',
    initialState,
    extraReducers:(builder) => {
        builder.
        addCase(getAllUsers.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllUsers.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {users} = payload;
            state.users = users;
        })
        .addCase(getAllUsers.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload)
        })
        .addCase(updatePassword.pending, (state) => {
            state.userLoading = true;
        })
        .addCase(updatePassword.fulfilled, (state, {payload}) => {
            state.userLoading = false;
            console.log(payload);
            toast.success("Password update successfuly")
        })
        .addCase(updatePassword.rejected, (state, {payload}) => {
            state.userLoading = false;
            toast.error(payload);
        })
        
    }
});

export default allUsersSlice.reducer;