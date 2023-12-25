// ProtectedCompany.js
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Loader from '../../shared/Loader';
import { CompanyContext } from '../context/company/Companycontext';

export default function ProtectedCompany({ children }) {
  const [loading, setLoading] = useState(true);
  const { company, setCompanycontext } = useContext(CompanyContext);

  useEffect(() => {
    const token = localStorage.getItem('companyToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCompanycontext(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [setCompanycontext]);

  if (loading) {
    return <Loader />;
  }

  if (!company) {
    return <Navigate to="/" />;
  }
  return children;
}
