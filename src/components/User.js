import React from 'react'
import styled from 'styled-components';



const User = ({name, email, role}) => {
  return (
    <Wrapper>
        <div className="content">
            <div className="content-center">
                <div className='edit-btn'> Name :  {name}</div>
                <div className='interview'> Email address : {email}</div>
                <div className='declined'>Role : {role}</div>
            </div>
        </div>
        
    </Wrapper>
  )
};



const Wrapper = styled.main`
background: var(--primary-50);
border-radius: var(--borderRadius);
display: grid;
grid-template-rows: 1fr;
box-shadow: var(--shadow-2);
font-size : 1.5rem;

.info {
  h5 {
    margin-bottom: 0.25rem;
  }
  p {
    margin: 0;
    color: var(--grey-400);
    letter-spacing: var(--letterSpacing);
  }
}
.pending {
  background: #cccc00;
  color: white;
}
.interview {
  color: #647acb;
}
.declined {
  color: #d66a6a;
}
.content {
  padding: 1rem 1rem;
}
.content-center {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 0.5rem;
  @media (min-width: 576px) {
    grid-template-columns: 1fr ;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr ;
  }
}

.status {
  border-radius: var(--borderRadius);
  letter-spacing: var(--letterSpacing);
  text-align: center;
  width: 100px;
  height: 30px;
  margin-top: 0.5rem;
}
footer {
  margin-top: 1rem;
}
.edit-btn,
.delete-btn {
  letter-spacing: var(--letterSpacing);
  cursor: pointer;
  height: 30px;
}
.edit-btn {
  color: #0c8d87;
  margin-right: 0.5rem;
}
.delete-btn {
  color: var(--red-dark);
  background: var(--red-light);
}
&:hover .actions {
  visibility: visible;
}
`;

export default User