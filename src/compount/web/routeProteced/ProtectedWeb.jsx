import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Loader from '../../shared/Loader';
import { CompanyContext } from '../context/company/Companycontext';

export default function ProtectedWeb({ children }) {
  const { company, setCompanycontext } = useContext(CompanyContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const decode = jwtDecode(token);
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
    return <Loader />;
  }

  if (company) {
    if (window.location.pathname === '/companylogin') {
      return children;
    }
    return <Navigate to="/dashboard" />;
  }

  return children;
}
