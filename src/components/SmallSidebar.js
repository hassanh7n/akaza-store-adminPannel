import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import links from '../utils/Links'
import NavLinks from './Navlinks'
import { toggleSidebar } from '../features/User'
import logo from '../images/logo.png';


const SmallSidebar = () => {
  const {isSidebarOpen} = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const toggle = () => {
    dispatch(toggleSidebar())
  }
  return (
    <Wrapper>
      <div className={isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">
          <button type='button' className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
          <nav>
               <img src={logo} className='img' alt="" />
               </nav>
          </header>
            <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  )
}


const Wrapper = styled.main`
@media (min-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: var(--primary-50);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }
  .content {
    background: var(--primary-50);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--borderRadius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark);
    cursor: pointer;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--grey-500);
    padding: 1rem 0;
    text-transform: capitalize;
    transition: var(--transition);
  }
  .nav-link:hover {
    color: var(--grey-900);
  }
  .nav-link:hover .icon {
    color: var(--primary-500);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active {
    color: var(--grey-900);
  }
  .active .icon {
    color: var(--primary-500);
  }
  .img{
    width : 150px
  }
`

export default SmallSidebar