import React, { useState } from 'react'

import {updateUser} from '../../features/updateUser';
import FormRow from './FormRow';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';


const Profile = () => {
  const dispatch = useDispatch();
  const {isLoading, user} = useSelector((store) => store.user);
  const [userData, setUserData] = useState({
    name : user?.name || '',
    email : user?.email || '',
    hobby : user?.hobby || '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, email, hobby} = userData;
    if(!name || !email || !hobby){
      toast.error('Please Fill Out All Fields')
      return
    };
    dispatch(updateUser({name, email, hobby}))
  };
  

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData, [name] : value})
  }
  return (
    <>
    <Wrapper>
      <form action="" onSubmit={handleSubmit} className="form">
      <h3>Profile</h3>

      <div className="form-center">
        <FormRow 
        type='text'
        name='name'
        value={userData.name}
        handleChange={handleChange}
        />
        <FormRow 
        type='text'
        name='hobby'
        value={userData.hobby}
        handleChange={handleChange}
        />
        <FormRow 
        type='email'
        name='email'
        value={userData.email}
        handleChange={handleChange}
        />
        <button 
        className="btn btn-block"
        type='submit'
        disabled={isLoading}
        >
          {isLoading ? 'Plaese wait ...' : 'save changes'}
        </button>



      </div>

      </form>
    </Wrapper>

    
        </>
  )
}


const Wrapper = styled.main`
border-radius: var(--borderRadius);
width: 100%;
background: var(--primary-50);
padding: 3rem 2rem 4rem;
box-shadow: var(--shadow-2);
h3 {
  margin-top: 0;
}
.form {
  margin: 0;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  max-width: 100%;
  width: 100%;
}
.form-row {
  margin-bottom: 0;
}
.form-center {
  display: grid;
  row-gap: 0.5rem;
}
.form-center button {
  align-self: end;
  height: 35px;
  margin-top: 1rem;
}
.btn-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  align-self: flex-end;
  margin-top: 0.5rem;
  button {
    height: 35px;
  }
}
.clear-btn {
  background: var(--grey-500);
}
.clear-btn:hover {
  background: var(--black);
}
@media (min-width: 992px) {
  .form-center {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    column-gap: 1rem;
  }
  .btn-container {
    margin-top: 0;
  }
}
@media (min-width: 1120px) {
  .form-center {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .form-center button {
    margin-top: 0;
  }
}
`

export default Profile