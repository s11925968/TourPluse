import React from 'react'
import Navbar from '../admin/navbar/Navbar.jsx'
import Footer from '../admin/footer/Footer.jsx'
import { Outlet, useLocation } from 'react-router-dom'
export default function Layoutadmin() {
  const location = useLocation();
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
