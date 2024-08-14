import { toast } from "react-toastify";
import customFetch from "../utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTokenFromLocalStorage} from'../utils/localStorage';


const initialState = {
    isLoading : false,
    userLoading : false,
    users : []
};


export const updateUser = createAsyncThunk(
    'user/updateSimpleUser',
    async(data, thunkAPI) => {
        try {
            const resp = await customFetch.patch('/user/updateUser', data, {
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






const updateUsers = createSlice({
    name : 'updateUser',
    initialState,
    extraReducers:(builder) => {
        builder
        .addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            toast.success("user updated")
        })
        .addCase(updateUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        
    }
});

export default updateUsers.reducer;