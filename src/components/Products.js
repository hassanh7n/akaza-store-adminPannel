import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllProducts } from '../features/allProducts';
import styled from 'styled-components';
import Product from './Product';
import PageBtnContainer from './PageBtnContainer';


const Products = () => {
  const dispatch = useDispatch();
  const [len, setLen] = useState()
  const {
    isLoading,
    products,
    name,
    numOfPages,
    totalProducts,
    page,
    sort,
    company,
    category,
  } = useSelector((store) => store.products);
  const {value} = useSelector((store) => store.product)
  // setLen(totalJobs)
  const length = products.length
 console.log(numOfPages);


  useEffect(() => {
    dispatch(getAllProducts())
  }, [name, category, company, page, sort, value])

  
  if(isLoading === true){
    return(
      <Wrapper>
      <h2>Loading...</h2>
    </Wrapper>
    )
  }
  

  if(products.length === 0){
    return(
      <Wrapper>
      <h2>No product to display.</h2>
    </Wrapper>
    )
  }

  return (
    <Wrapper>
        <h5>
          {totalProducts } Product{products.length > 1 && 's'}    found
        </h5>
        <div className="jobs">
          {products.map((products) => {
            return <Product 
            key={products._id}
            {...products}
            />
          })}
        </div>
        {numOfPages > 1 && <PageBtnContainer />}
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

export default Products