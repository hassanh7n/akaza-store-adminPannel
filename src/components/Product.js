import moment from 'moment/moment'
import React from 'react'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ProductInfo from './ProductInfo'
import {MdInventory, MdRateReview} from 'react-icons/md'
import {GiPriceTag, GiSinkingShip} from 'react-icons/gi'
import {SiNamecheap} from 'react-icons/si'
import {BiSolidCategoryAlt} from 'react-icons/bi'
import {TbBrandAdobe} from 'react-icons/tb'
import {MdDescription, MdInvertColors} from 'react-icons/md'
import {FcShipped} from 'react-icons/fc'
import {AiFillStar} from 'react-icons/ai'
import { deleteProduct, setEditJob } from '../features/Product';


const Product = ({
    _id,
    name,
    averageRating,
    colors,
    category,
    company,
    createdAt,
    discription,
    freeShipping,
    images,
    inventory,
    numOfReviews,
    price,
    reviews,
    
}) => {
   
        const dispatch = useDispatch();
        const date = moment(createdAt).format('MMM Do, YYYY');
  return (
    <Wrapper>
       <header>
        <img src={images[0]?.src} alt="" />
      </header>
      <div className='content'>
        <div className='content-center'>
        <ProductInfo icon={<SiNamecheap/>} text={name}/>
        <ProductInfo icon={<GiPriceTag/>} text={price + '$'}/>
          <ProductInfo icon={<BiSolidCategoryAlt/>} text={category}/>
          <ProductInfo icon={<TbBrandAdobe/>} text={company}/>

          <ProductInfo icon={<FaCalendarAlt/>} text={date} />
          <ProductInfo icon={<MdDescription/>} text={discription} />
          <ProductInfo icon={<MdInvertColors/>} text={colors + ' ' + 'color'} />
          <ProductInfo icon={freeShipping === 'true' ? <FcShipped /> : <GiSinkingShip/>} text={freeShipping === 'true' ? "Shipping true" : 'Shipping false'} />
          <ProductInfo icon={<MdInventory/>} text={inventory + ' '+'peices'} />
          <ProductInfo icon={<MdRateReview/>} text={numOfReviews} />
          <ProductInfo icon={<AiFillStar/>} text={averageRating + ' ' + 'star rating'} />
          <div className={`status `}></div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-product'
              className='btn edit-btn'
              onClick={
                () => {
                  dispatch(
                    setEditJob({
                      editProductId : _id,
                      name,
                      colors,
                      category,
                      company,
                      discription,
                      freeShipping,
                      images,
                      inventory,
                      price,
                    })
                  )
                }
              }
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={
                () => dispatch(deleteProduct(_id))
              }
            >
              Delete
            </button>
          </div>
        </footer>
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



export default Product