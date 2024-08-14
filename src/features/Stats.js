import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";
import { getTokenFromLocalStorage} from'../utils/localStorage';



const initialState = {
    isLoading : false,
    ordersStats : [],
    productsStats : []
};


export const productStats = createAsyncThunk(
    'products/showStats',
    async(_, thunkAPI) => {
        try {
            const resp = await customFetch.get('/product/showStats', {
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


export const orderStats = createAsyncThunk(
    'orders/showStats',
    async(_, thunkAPI) => {
        try {
            const resp = await customFetch.get('/order/showStats', {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            });
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    } 
)


const statsSlice = createSlice({
    name : 'stats',
    initialState,
    extraReducers:(builder) => {
        builder.
        addCase(productStats.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(productStats.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            console.log(payload);
            const {monthlyApplications} = payload;
            state.productsStats = monthlyApplications;
            
        })
        .addCase(productStats.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload)
        })
        .addCase(orderStats.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(orderStats.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            console.log(payload);
            const {monthlyApplications} = payload;
            state.ordersStats = monthlyApplications;
            
        })
        .addCase(orderStats.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload)
        })
    }
});





export default statsSlice.reducer;