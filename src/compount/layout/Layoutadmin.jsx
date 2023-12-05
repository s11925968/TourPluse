import React from 'react'
import Navbar from '../admin/navbar/Navbar.jsx'
import Footer from '../admin/footer/Footer.jsx'
import { Outlet, useLocation } from 'react-router-dom'
export default function Layoutadmin() {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/admin/login';

  // If it's the login page, render only the Outlet (login component)
  if (isLoginPage) {
    return <Outlet />;
  }
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
