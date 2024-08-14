import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllOrders} from '../../features/Orders';
import styled from 'styled-components';
import { Order } from '../../components';
import Search from './Search';

const AllOrders = () => {
  
  const {isLoading, orders, } = useSelector((store) => store.orders);
  if(isLoading === true){
    return(
      <Wrapper>
      <h2>Loading...</h2>
    </Wrapper>
    )
  }

  



  return (
    <Wrapper>
        <div className="jobs">
          {orders.map((order) => {
            return <Order 
            key={order._id}
            {...order}
            />
          })}
        </div>
    </Wrapper>
  )
}



const Wrapper = styled.main`
margin-top: 4rem;
h2 {
  text-transform: none;
}
& > h5 {
  font-weight: 700;
}
.jobs {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 2rem;
}
@media (min-width: 992px) {
  .jobs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}
`



export default AllOrders