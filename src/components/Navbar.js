import React, { useState } from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa'
import logo from '../images/logo.png';
import { FiMenu } from "react-icons/fi";
import { logoutUser, logouttUser, toggleSidebar } from '../features/User'





const Navbar = () => {
  const {user} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleSidebar())
  }
  const [showLogout, setShowLogout] = useState(false)
  const onclick = () => {
    dispatch(logoutUser());
    dispatch(logouttUser());
  }
  return (
    <Wrapper>
      <div className="nav-center">
        <button
        type='button'
        className='toggle-btn'
        onClick={toggle}
        >
          <FiMenu />
        </button>
        <div>
          <div className="Logo">
          <nav>
               <img src={logo} className='img' alt="" />

               </nav>
            </div>
          <h3 className="logo-text">Admin Dashboard</h3>
        </div>
        <div className="btn-container">
          <button 
          className='btn'
          type='button'
          onClick={() =>setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
            type='button'
            className='dropdown-btn'
            onClick={() => onclick()}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}


const Wrapper = styled.main`

height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  .logo {
    display: flex;
    align-items: center;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  background: var(--primary-50);
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--primary-100);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
  .logo-text {
    display: none;
    margin: 0;
  }
  .img{
      width : 95px
    }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
    .Logo{
      display : none;
    }
    .img{
      width : 95px
    }
  }
`

export default Navbar