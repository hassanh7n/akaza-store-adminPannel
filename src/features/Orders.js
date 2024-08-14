import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getTokenFromLocalStorage} from'../utils/localStorage';
import customFetch from "../utils/axios";



const initialState = {
    isLoading : false,
    orders : [],
    totalOrders: 0,
    numOfPages: 1,
    page: 1,
    sort : 'latest',
    page : 1,
    name : '',
    sortOptions : ['latest', 'oldest'],
};


export const getAllOrders = createAsyncThunk(
    'orders/getAllOrders',
    async(_, thunkAPI) => {
        const {name, sort, page} =
      thunkAPI.getState().orders;
    //   &page=${page}
      let url = `/order?&page=${page}&sort=${sort}`;

      
      console.log(name, sort);
        try {
            const resp = await customFetch.get(url, {
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


export const updateOrder = createAsyncThunk(
    'order/updateOrder',
    async({orderId, order}, thunkAPI) => {
        try {
            const resp = await customFetch.patch(`/order/${orderId}`, order, {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            })
            console.log(resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)



const allOrderSlice = createSlice({
    name : 'order',
    initialState,
    reducers:{
        showLoading: (state) => {
          state.isLoading = true;
        },
        hideLoading : (state) => {
          state.isLoading = false
        },
        handleChange : (state, { payload  : {name, value}}) => {
           state.page = 1
          state[name] = value;
        },
        clearFilters: (state) => {
          return {...state, ...initialState}
        },
        changePage : (state, {payload}) => {
          state.page =  payload;
        },
        clearAllJobsState : () => initialState,
      },
    extraReducers : (builder) => {
        builder.
        addCase(getAllOrders.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllOrders.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {orders} = payload;
            state.orders = orders;
            const {numOfPages} = payload;
            state.numOfPages = numOfPages;
            const {totalOrders} = payload;
            state.totalOrders = totalOrders;
        })
        .addCase(getAllOrders.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(updateOrder.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateOrder.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            toast.success("Update order successfuly!")
        })
        .addCase(updateOrder.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload)
        })
    }
});



export const {
    hideLoading, 
    showLoading,
    handleChange,
    clearFilters,
    changePage,
    clearAllJobsState
  } = allOrderSlice.actions;

export default allOrderSlice.reducer;