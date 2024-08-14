import React from 'react'
import { changePage } from '../../features/Orders';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const PageBtn = () => {
    const { numOfPages, page } = useSelector((store) => store.orders);
  const dispatch = useDispatch();
    const pages = Array.from({length : numOfPages}, (_, index) => {
        return index + 1;
    })
    const nextPage = () => {
        let newpage = page + 1;
        if(newpage > numOfPages){
            newpage = 1;
        }
        dispatch(changePage(newpage))
    };
    const prevPage = () => {
        let newpage = page - 1;
        if(newpage < 1){
            newpage = numOfPages;;
        }
        dispatch(changePage(newpage))
    };
  return (
    <Wrapper>
        <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              key={pageNumber}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.main`
 height: 6rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;
  .btn-container {
    background: var(--primary-100);
    border-radius: var(--borderRadius);
  }
  .pageBtn {
    background: transparent;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    transition: var(--transition);
    border-radius: var(--borderRadius);
    cursor: pointer;
  }
  .active {
    background: var(--primary-500);
    color: var(--white);
  }
  .prev-btn,
  .next-btn {
    width: 100px;
    height: 40px;
    background: var(--white);
    border-color: transparent;
    border-radius: var(--borderRadius);
    color: var(--primary-500);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
  }
`

export default PageBtn