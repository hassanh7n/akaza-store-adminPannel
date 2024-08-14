import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { handleChange } from '../../features/Orders';
import FormRowSelect from '../../components/FormRowSelect';
import FormRow from '../../components/FormRow';


const Search = () => {
    const dispatch = useDispatch();
  const {
    isLoading,
    // companyOptions,
    sort,
    sortOptions,
    name
  } = useSelector((store) => store.orders);


  const handleSearch = (e) => {
    if(isLoading) return;
    dispatch(handleChange({name : e.target.name, value : e.target.value}));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="from-center">
          {/* name
          <FormRow 
          type='text'
          name='name'
          value={name}
          handleChange={handleSearch}
          /> */}

          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            lists={sortOptions}
          />  

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

export default Search