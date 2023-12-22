import React, { useEffect, useState } from 'react';
import Navbar from '../web/navbar/Navbar.jsx';
import Footer from '../web/footer/Footer.jsx';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout({ users, setUser}) {

  return (
    <>
      <Navbar users={users} setUser={setUser} />
      <Outlet />
      <Footer />
    </>
  );
}
