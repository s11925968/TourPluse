import React from 'react';
import { Navigate } from 'react-router-dom';

const LoginProtected = ({ children, users }) => {
  // Assuming users.role indicates the login status
  if (users) {
    if(users.role === 'User'){
      return <Navigate to="/" />;
    }
    else{
      return <Navigate to="/admin" />;
    }
    
  }
  return children;
};

export default LoginProtected;
