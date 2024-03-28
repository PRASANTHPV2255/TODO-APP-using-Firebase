import React from 'react'
import { UserAuth } from './AuthContex'
import { Navigate, useNavigate } from 'react-router-dom';

const Protected = ({children}) => {
  const nav=useNavigate()
  const {user}=UserAuth();

  if(!user){
    return(<Navigate to='/'/>)
  }
  return children;
}

export default Protected
