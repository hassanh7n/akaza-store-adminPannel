import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {Navbar, BigSidebar, SmallSidebar} from '../../components';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'


const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}


const Wrapper = styled.main`
.dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }






`

export default SharedLayout