import moment from 'moment/moment'
import React from 'react'
import {updateOrder} from '../features/Orders';
import { FaCalendarAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import ProductInfo from './ProductInfo'
import {SiVirustotal} from 'react-icons/si'
import {GiPriceTag, GiSinkingShip} from 'react-icons/gi'
import {MdOutlineProductionQuantityLimits} from 'react-icons/md'
import {GrStatusUnknown} from 'react-icons/gr'
import {SiNamecheap} from 'react-icons/si'
import {TbReceiptTax} from 'react-icons/tb'
import {IoPricetags} from 'react-icons/io5'
import {MdDescription, MdInvertColors} from 'react-icons/md'
import {FcShipped} from 'react-icons/fc'
import {AiFillStar} from 'react-icons/ai'
const Order = ({
  _id,
  createdAt,
  orderItems,
  shippingFee,
  status,
  subtotal,
  tax,
  total,
  updatedAt
}) => {
  console.log(createdAt,
    orderItems[0].image,
    orderItems,
    shippingFee,
    status,
    subtotal,
    tax,
    total,
    updatedAt);
    const dispatch = useDispatch();
    const date = moment(createdAt).format('MMM Do, YYYY');
    const update = moment(updatedAt).format('MMM Do, YYYY');
    const paid = () => {
        dispatch(updateOrder(
          {orderId: _id,
            order : {
            }
          }
        ))
    }
  return (
    <Wrapper>
       <header>
        <img src={orderItems[0].image} alt="" />
      </header>
      <div className='content'>
        <div className='content-center'>
        <ProductInfo icon={<SiNamecheap/>} text={'Name : ' + orderItems[0].name}/>
        <ProductInfo icon={<GiPriceTag/>} text={'Price : ' + orderItems[0].price + '$'}/>
        <ProductInfo icon={<MdOutlineProductionQuantityLimits/>} text={'Pieces : ' + orderItems[0].amount}/>
          <ProductInfo icon={<SiVirustotal/>} text={'Subtotal : ' + subtotal}/>
          <ProductInfo icon={<TbReceiptTax/>} text={'Tax : ' +tax}/>

          <ProductInfo icon={<FaCalendarAlt/>} text={'CreatedAt : ' + date} />
          <ProductInfo icon={<FaCalendarAlt/>} text={'updatedAt : ' +update} />
          <ProductInfo icon={<GrStatusUnknown/>} text={'Status : ' +status} />
          <ProductInfo icon={<FcShipped />}  text={'ShippingFee : ' +shippingFee}/>
          <ProductInfo icon={<IoPricetags />}  text={'Total : ' +total  + ' $'}/>
        </div>
        <button onClick={paid} className='btn'>Status Paid</button>
      </div>
    </Wrapper>
  )
}





const Wrapper = styled.main`
background: var(--primary-50);
border-radius: var(--borderRadius);
display: grid;
grid-template-rows: 1fr;
box-shadow: var(--shadow-2);

header {
  padding: 1rem 1rem;
  border-bottom: 1px solid var(--grey-100);
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  h5 {
    letter-spacing: 0;
  }
}
img{
  width: 100%;
  height: auto;
  display: grid;
  place-items: center;
  background: var(--primary-500);
  border-radius: var(--borderRadius);
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--white);
}
/* @media (min-width: 500px){
    img{
        width: 380px;
  height: auto;
    }
} */
.info {
  h5 {
    margin-bottom: 0.25rem;
  }
  p {
    margin: 0;
    text-transform: capitalize;
    color: var(--grey-400);
    letter-spacing: var(--letterSpacing);
  }
}
.pending {
  background: #cccc00;
  color: white;
}
.interview {
  background: #e0e8f9;
  color: #647acb;
}
.declined {
  color: #d66a6a;
  background: #ffeeee;
}
.content {
  padding: 1rem 1rem;
}
.content-center {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 0.5rem;
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr;
  }
}

.status {
  border-radius: var(--borderRadius);
  text-transform: capitalize;
  letter-spacing: var(--letterSpacing);
  text-align: center;
  width: 100px;
  height: 30px;
  margin-top: 0.5rem;
}
footer {
  margin-top: 1rem;
}
.edit-btn,
.delete-btn {
  letter-spacing: var(--letterSpacing);
  cursor: pointer;
  height: 30px;
}
.edit-btn {
  color: var(--green-dark);
  background: var(--green-light);
  margin-right: 0.5rem;
}
.delete-btn {
  color: var(--red-dark);
  background: var(--red-light);
}
&:hover .actions {
  visibility: visible;
}
`;

export default Order