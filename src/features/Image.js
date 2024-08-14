import { toast } from "react-toastify";
import customFetch from "../utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTokenFromLocalStorage} from'../utils/localStorage';



const initialState = {
    url2 : '',
    url3 : '',
    url4 : '',
    url5 : '',
    token : getTokenFromLocalStorage(),
};






export const Imagee = createAsyncThunk(
    'product/image',
    async(url, thunkAPI) => {
        try {
            console.log(thunkAPI.getState().user);
            const resp = await customFetch.post('/product/uploadImage2',url ,{
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





export const selfie = createAsyncThunk(
    'product/selfie',
    async(url, thunkAPI) => {
        try {
            console.log(thunkAPI.getState().user);
            const resp = await customFetch.post('/product/uploadImage4',url ,{
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


export const tasweer = createAsyncThunk(
    'product/raswwen',
    async(url, thunkAPI) => {
        try {
            console.log(thunkAPI.getState().user);
            const resp = await customFetch.post('/product/uploadImage5',url ,{
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

export const pic = createAsyncThunk(
    'product/pic',
    async(url, thunkAPI) => {
        try {
            console.log(thunkAPI.getState().user);
            const resp = await customFetch.post('/product/uploadImage3',url ,{
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





const imageSlice = createSlice({
    name : 'image',
    initialState,
    extraReducers : (builder) => {
        builder
        .addCase(Imagee.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(Imagee.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isImageUpload = true;
            const {image} = payload;
            state.url2 = image.src;
            toast.success("Image 2 upload")
        })
        .addCase(Imagee.rejected, (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        })
        .addCase(selfie.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(selfie.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isImageUpload = true;
            const {image} = payload;
            state.url4 = image.src;
            toast.success("Image 4 upload")
        })
        .addCase(selfie.rejected, (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        })
        .addCase(tasweer.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(tasweer.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isImageUpload = true;
            const {image} = payload;
            state.url5 = image.src;
            toast.success("Image 5 upload")
        })
        .addCase(tasweer.rejected, (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        })
        .addCase(pic.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(pic.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isImageUpload = true;
            const {image} = payload;
            state.url3 = image.src;
            toast.success('Image uploaded now submit the form')
        })
        .addCase(pic.rejected, (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        })
    }
});



export default imageSlice.reducer;
