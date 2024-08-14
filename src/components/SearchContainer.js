import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { handleChange, clearFilters } from '../features/allProducts'
import FormRowSelect from './FormRowSelect';
import FormRow from './FormRow';

const SearchContainer = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    categoryOptions,
    // companyOptions,
    sort,
    sortOptions,
    category,
    company,
    name
  } = useSelector((store) => store.products);

  
    const handleSearch = (e) => {
      if(isLoading) return;
      dispatch(handleChange({name : e.target.name, value : e.target.value}));
    
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(clearFilters())
    }
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="from-center">
          {/* name */}
          <FormRow 
          type='text'
          name='name'
          value={name}
          handleChange={handleSearch}
          />

          {/* search by status */}
          <FormRowSelect
            labelText='category'
            name='category'
            value={category}
            handleChange={handleSearch}
            lists={['all', ...categoryOptions]}
          />

          {/* Search by type */}
          <FormRow 
          type='text'
          name='company'
          value={company}
          handleChange={handleSearch}
          />
          {/* <FormRowSelect 
          labelText='company'
          name='company'
          value={company}
          handleChange={handleSearch}
          lists={['all', ...companyOptions]}
          /> */}

          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            lists={sortOptions}
          />  

          <button
          className='btn btn-block btn-danger'
          disabled={isLoading}
          onClick={handleSubmit}
          >
            clear filters
          </button>

        </div>
      </form>
    </Wrapper>
  )
}


const Wrapper = styled.main`
.form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`

export default SearchContainer