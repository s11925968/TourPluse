import React from 'react'
import Navbar from '../admin/navbar/Navbar.jsx'
import Footer from '../admin/footer/Footer.jsx'
import { Outlet, useLocation } from 'react-router-dom'
export default function Layoutadmin({users,setUser}) {
  const location = useLocation();
  return (
    <div>
      <Navbar  users={users} setUser={setUser}/>
      <Outlet />
      <Footer />
    </div>
  )
}
