import { toast } from "react-toastify";
import customFetch from "../utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTokenFromLocalStorage} from'../utils/localStorage';



const initialState = {
    isLoading : false,
    name : '',
    price : 1,
    discription : '',
    image : '',
    category : 'jewellery',
    categoryOptions : [ 'jewellery', 'clothing', 'shoes', 'other'],
    // companyOptions : ['ikea', 'liddy', 'marcos'],
    company : '',
    color : '',
    isEditing : false,
    isRefresh : false,
    url : '',
    url2 : '',
    isImageUpload : false,
    editProductId : '',
    value : false,
    shippingOptions : ['false', 'true'],
    token : getTokenFromLocalStorage(),
};


export const createProduct = createAsyncThunk(
    'product/createProduct',
    async(product, thunkAPI) => {
        try {
            const resp = await customFetch.post('/product', product,{
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            });
            console.log(resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)


export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async({productId, product}, thunkAPI) => {
        try {
            const resp = await customFetch.patch(`/product/${productId}`, product, {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            })
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);


export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async(productId, thunkAPI) => {
        try {
            const resp = await customFetch.delete(`/product/${productId}`, {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            })
            
            return resp.data;
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)




export const uploadImage = createAsyncThunk(
    'product/imageUpload',
    async(url, thunkAPI) => {
        try {
            console.log(thunkAPI.getState().user);
            const resp = await customFetch.post('/product/uploadImage1',url ,{
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






const productSlice = createSlice({
    name : 'product',
    initialState,
    reducers : {
        handleChange : (state, {payload : {name, value}}) => {
            state[name] = value;
        },
        clearValues : () => {
            return{
                ...initialState,
            }
        },
        setEditJob : (state, {payload}) => {
            return{...state, isEditing : true, ...payload};
        }
    },
    extraReducers : (builder) => {
        builder.
        addCase(createProduct.pending, (state) => {
            state.isLoading = true 
        }) 
        .addCase(createProduct.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {product} = payload;
            console.log(product);
            toast.success('Product Created')
        })
        .addCase(createProduct.rejected, (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        })
        .addCase(uploadImage.pending, (state) => {
            state.isLoading = true;
            toast.info("Please wait for a moment")
        })
        .addCase(uploadImage.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isImageUpload = true;
            const {image} = payload;
            state.url = image.src;
            toast.success("Image 1 upload")
        })
        .addCase(uploadImage.rejected, (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        })
        .addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateProduct.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            
            const {product} = payload;
            console.log(payload);
            toast.success('Product updated successfuly')
            state.isEditing = false
        })
        .addCase(updateProduct.rejected, (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        })
        .addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
            state.value = false;
        })
        .addCase(deleteProduct.fulfilled, (state) => {
            state.value = true;
            state.isLoading = false;
            toast.success('Product deleted successfuly');
            
        })
        .addCase(deleteProduct.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
    }
});

export const { handleChange, clearValues, setEditJob } = productSlice.actions;

export default productSlice.reducer;
