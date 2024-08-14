import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllOrders} from '../../features/Orders';
import { Order } from '../../components';
import Search from './Search'
import AllOrders from './AllOrders'
import PageBtn from './PageBtn';
const Orders = () => {
    const dispatch = useDispatch();
  const {isLoading, orders, totalOrders, numOfPages, name, sort, page} = useSelector((store) => store.orders);
  console.log(orders, totalOrders, numOfPages);
  useEffect(() => {
    dispatch(getAllOrders())
  }, [name, sort, page]);

  
  return (
    <>
      <Search />
      <AllOrders />
      {numOfPages > 1 && <PageBtn />}
    </>
  )
}

export default Orders