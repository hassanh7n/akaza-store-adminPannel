import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Landing,
  Register,
  Error,
  ProtectedRoutes
} from './pages';
import {
  AddProducts,
  Orders,
  AllUsers,
  Profile,
  SharedLayout,
  Stats,
  AllProducts,
  ProductStats,
  OrdersStats,
  UpdatePassword
} from './pages/Dashboard.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={
        <ProtectedRoutes>
          <SharedLayout/>
      </ProtectedRoutes>
      }>
          <Route index element={<ProductStats />} />
          <Route path='orders-stats'  element={<OrdersStats />} />
          <Route path='add-product' element={<AddProducts />} />
          <Route path='all-products' element={<AllProducts />} />
          <Route path='all-users' element={<AllUsers />} />
          <Route path='all-orders' element={<Orders />} />
          
          <Route path='profile' element={<Profile />} />
          <Route path='update-password' element={<UpdatePassword />} />

        </Route>
        <Route path='register' element={<Register/>} />
        <Route path='landing' element={<Landing/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
      <ToastContainer position='top-center' />
    </BrowserRouter>
  )
}

export default App