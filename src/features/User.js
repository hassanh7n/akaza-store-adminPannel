import { toast } from "react-toastify";
import customFetch from "../utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {addUserToLocalStorage, addTokenToLocalStorage,removeUserFromLocalStorage, removeTokenFromLocalStorage,getUserFromLocalStorage, getTokenFromLocalStorage} from'../utils/localStorage';


const initialState = {
    isLoading : false,
    user : getUserFromLocalStorage(),
    isSidebarOpen : false
};

// export const registerUser = createAsyncThunk(
//     'user/registerUser',
//     async(user, thunkAPI) => {
//         try {
//             const resp = await customFetch.post('/auth/register', user);
//             return resp.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data.msg)
//         }
//     }
// );


export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(user, thunkAPI) => {
        try {
            const resp = await customFetch.post('/auth/login', user);
            console.log(resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)


export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async(thunkAPI) => {
        try {
            const resp = await customFetch.get('/auth/logout');
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)



export const ResetPassword = createAsyncThunk(
    'user/ResetPassword',
    async(data, thunkAPI) => {
        try {
            const resp = await customFetch.patch('/auth/resestPassword', data);
            console.log(resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)





const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        toggleSidebar : (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        logouttUser : (state, {payload}) => {
            state.user = null;
            state.isSidebarOpen = false;
            removeUserFromLocalStorage();
            if(payload){
                toast.success(payload)
            }
          },
    },
    extraReducers : (builder) => {
        builder.
        addCase(ResetPassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(ResetPassword.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {user} = payload;
            const {token} = payload;
            state.user = user;
            addUserToLocalStorage(user);
            addTokenToLocalStorage(token);
        })
        .addCase(ResetPassword.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(loginUser.pending, (state, {payload}) => {
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {user} = payload;
            const {token} = payload;
            state.user = user;
            console.log(user);
            addUserToLocalStorage(user);
            addTokenToLocalStorage(token)
            toast.success("Reset Password")
            toast.success(`Welcome back ${user.name}`)

        })
        .addCase(loginUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload)
        })
        .addCase(logoutUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            console.log('LogOut userSuccessfuly');removeUserFromLocalStorage();
            removeTokenFromLocalStorage();
        })
        .addCase(logoutUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload)
        })
        
    }
});

export const { toggleSidebar, logouttUser} = userSlice.actions;
export default userSlice.reducer;