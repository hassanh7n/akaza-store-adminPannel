import React from 'react'
import styled from 'styled-components'


const ProductInfo = ({icon, text}) => {
    return (
      <Wrapper>
          <span className='icon'>{icon}</span>
          <span className='text'>{text}</span>
      </Wrapper>
    )
  }


  const Wrapper = styled.main`
margin-top: 0.5rem;
  display: flex;
  align-items: center;

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--grey-400);
    }
  }
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
`

export default ProductInfo