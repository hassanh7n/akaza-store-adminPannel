import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllUsers} from '../../features/AllUsers';
import styled from 'styled-components';
import { User } from '../../components';






const AllUsers = () => {
  const {isLoading, users} = useSelector((store) => store.allUsers);
  const dipatch = useDispatch();
  useEffect(() => {
    dipatch(getAllUsers())
  }, []);


  if(isLoading === true){
    return(
      <Wrapper>
      <h2>Loading...</h2>
    </Wrapper>
    )
  }






  return (
    <Wrapper>
        <div className="jobs">
          {users.map((user) => {
            return <User 
            key={user._id}
            {...user}
            />
          })}
        </div>
    </Wrapper>
  )
};


const Wrapper = styled.main`
margin-top: 4rem;
h2 {
  text-transform: none;
}
& > h5 {
  font-weight: 700;
}
.jobs {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 2rem;
}
@media (min-width: 992px) {
  .jobs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}
`


export default AllUsers