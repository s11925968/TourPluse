import React from 'react'
import Navbar from '../dashbord/navbar/Navbar.jsx'
import Footer from '../dashbord/footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
export default function Layoutadmin() {
  
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
