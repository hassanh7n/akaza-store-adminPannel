const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const { toast } = require("react-toastify");
const { default: customFetch } = require("../utils/axios");


const initialFilters = {
    name : '',
    category : 'all',
    company : '',
    categoryOptions : ['clothing', 'jewellery', 'shoes', 'other'],
    // companyOptions : ['ikea', 'liddy', 'marcos'],
    sort : 'latest',
    sortOptions : ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
    isLoading : false,
    products : [],
    product : [],
    totalProducts: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    reviews : [],
    ...initialFilters
};

export const getAllProducts = createAsyncThunk(
    'products/allProducts',
    async(_, thunkAPI) => {
        const { page, name, category, company, sort } =
      thunkAPI.getState().products;
      let url = `/products?category=${category}&company=${company}&sort=${sort}&page=${page}`;
      
      if (name) {
        url = url + `&name=${name}`;
      }

        try {
            const resp = await customFetch.get(url);
            console.log(resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)



const productsSlice = createSlice({
    name : 'products',
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
          return {...state, ...initialFilters}
        },
        changePage : (state, {payload}) => {
          state.page =  payload;
        },
        clearAllJobsState : () => initialState,
      },
    extraReducers:(builder) => {
        builder.
        addCase(getAllProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllProducts.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            
            const {products} = payload;
            const {totalProducts} = payload;
            const {numOfPages} = payload
            state.totalProducts = totalProducts;
            state.numOfPages = numOfPages
            console.log(totalProducts, numOfPages);
            state.products = products;
            toast.success("Scroll Up!")
        })
        .addCase(getAllProducts.rejected, (state, {payload}) => {
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
  } = productsSlice.actions;


export default productsSlice.reducer;