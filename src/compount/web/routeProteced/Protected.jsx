import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Loader from '../../shared/Loader';

export default function Protected({ users, children,setUser }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const decode = jwtDecode(token);
        setUser(decode);
      } catch (error) {
        console.error('Error decoding token:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader />
  }
  if (!users || !users.role) {
    return <Navigate to="/" />;
  }
  if (users.role === 'User') {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
