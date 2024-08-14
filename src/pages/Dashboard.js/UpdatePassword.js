import React, { useState } from 'react'
import {updatePassword} from '../../features/AllUsers';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormRow from './FormRow';

const UpdatePassword = () => {
    const dispatch = useDispatch();
  const {userLoading} = useSelector((store) => store.allUsers)
  const [userData, setUserData] = useState({
    oldPassword : '',
    newPassword : ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const {oldPassword, newPassword} = userData;
    if(!oldPassword || !newPassword){
      toast.error('Please Fill Out All Fields')
      return
    };
    dispatch(updatePassword({oldPassword, newPassword}))
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData, [name] : value})
  }
  return (
    <Wrapper>
      <form action="" onSubmit={handleSubmit} className="form">
      <h3>update password</h3>

      <div className="form-center">
        <FormRow 
        type='text'
        name='oldPassword'
        value={userData.oldPassword}
        handleChange={handleChange}
        />
        <FormRow 
        type='text'
        name='newPassword'
        value={userData.newPassword}
        handleChange={handleChange}
        />
        <button 
        className="btn btn-block"
        type='submit'
        disabled={userLoading}
        >
          {userLoading ? 'Please wait...' : 'save changes'}
        </button>



      </div>

      </form>
    </Wrapper>
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

export default UpdatePassword