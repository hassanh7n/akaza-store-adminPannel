import React, { useEffect, useState } from 'react'
import '../css/Register.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser, registerUser,ResetPassword } from '../features/User'
import FormRow from '../components/FormRow'
import { Navigate, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png';

const initialState = {
  name : "",
  password : "",
  email : "",
  isMember : true,
  forgetPassword : false,
  resetPassword : "",
  hobby : "",

}

const Register = () => {
  const [values, setValues] = useState(initialState);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, isLoading} = useSelector((store) => store.user);
  const togglePassword = () => {
    setValues({...values, forgetPassword : !values.forgetPassword})
  }
  

  const toggleMember = () => {
    setValues({...values, isMember : !values.isMember})
  }
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember, forgetPassword, hobby,resetPassword} = values;
    if( !email || !password){
      console.log("Please fill out all the fields");
    };
    if(isMember && !values.forgetPassword){
      dispatch(loginUser({email : email, password : password}))
      return
    }
    // dispatch(registerUser({name, email, password})); 
    if(values.forgetPassword){
      dispatch(ResetPassword({email : email, hobby : hobby, newPassword : resetPassword}))
    }
  }

  
    if(user?.role === 'admin'){
      return (
        setTimeout(() => {
                Navigate('/')
              }, 3000)
      )
    }

    
  

  return (
    <div className='Wrapper'>
        <form onSubmit={handleSubmit} className="form" >
               <nav>
                <img src={logo} className='img' alt="" />
                {/* <span className='span'>STORE</span> */}
               </nav>
               
              {/* name field
              {!values.isMember && (
                <FormRow
                  type='text'
                  name='name'
                  value={values.name}
                  handleChange={handleChange}
                />
              )} */}

              {/* email field */}
              <FormRow
              type='email'
              name='email'
              value={values.email}
              handleChange={handleChange}
              />


              {!values.forgetPassword && (
              <FormRow
              type='password'
              name='password'
              value={values.password}
              handleChange={handleChange}
              />
              )

              }
              {values.forgetPassword && (
              <FormRow
              type='text'
              name='hobby'
              value={values.hobby}
              handleChange={handleChange}
              />
              )

              }

            {values.forgetPassword && (
              <FormRow
              type='password'
              name='resetPassword'
              value={values.resetPassword}
              handleChange={handleChange}
              />
              )

              }
              


      <button type='submit' className='btn btn-block btn-hipster' disabled={isLoading}
      >
        
        {isLoading ? 'loading...' : 'submit'}
      </button>
      <p>
          {/* {values.forgetPassword ? 'forgot password?' : 'enter you password'} */}
          <button type='button' onClick={togglePassword} className='member-btn'>
            {values.forgetPassword ? 'login' : 'forget password?'}
          </button>

        </p>
        
        </form>
    </div>
  )
}

export default Register