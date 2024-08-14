import React, { useEffect } from 'react'
import {
  ChartsContainerProduct,} from '../../components';
  import {productStats} from '../../features/Stats';
import { useDispatch, useSelector } from 'react-redux'; 

const ProductStats = () => {
  const dispatch = useDispatch();
  const {isLoading, productsStats} = useSelector((store) => store.stats);
  useEffect(() => {
    dispatch(productStats());
  }, [])

  if(isLoading){
    return <h5>Loading ...</h5>
  }

  return (
    <>
    {productStats.length > 0 && <ChartsContainerProduct/>}
    
    </>
  )
}

export default ProductStats