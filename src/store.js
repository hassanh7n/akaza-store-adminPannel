import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/User";
import productSlice from './features/Product';
import productsSlice from './features/allProducts';
import allUsers from './features/AllUsers';
import allOrders from './features/Orders';
import statsSlice from './features/Stats';
import updateUsers from './features/updateUser';
import imageSlice from './features/Image';
export const store = configureStore({
    reducer : {
        user : userSlice,
        product : productSlice,
        products : productsSlice,
        allUsers : allUsers,
        orders : allOrders,
        stats : statsSlice,
        update : updateUsers,
        image : imageSlice
    },
})