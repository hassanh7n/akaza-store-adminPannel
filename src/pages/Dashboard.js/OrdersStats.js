import React, { useEffect } from 'react'
import {
  ChartsContainerOrders} from '../../components';
import {orderStats} from '../../features/Stats';
import { useDispatch, useSelector } from 'react-redux';



const OrdersStats = () => {
  const dispatch = useDispatch();
  const {isLoading, ordersStats} = useSelector((store) => store.stats);
  useEffect(() => {
    dispatch(orderStats());
  }, [])

  if(isLoading){
    return <h5>Loading ...</h5>
  }
  return (
    <ChartsContainerOrders/>
  )
}

export default OrdersStats