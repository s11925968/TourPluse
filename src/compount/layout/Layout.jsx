import React, { useEffect, useState } from 'react';
import Navbar from '../web/navbar/Navbar.jsx';
import Footer from '../web/footer/Footer.jsx';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout({ users, setUser}) {
  const [isLoginPage, setIsLoginPage] = useState("");
  const location = useLocation();

  const getIsLoginPage = () => {
    const isLogging = location.pathname === '/login';
    setIsLoginPage(isLogging);
  };

  useEffect(() => {
    getIsLoginPage();
  }, [location.pathname]); // Add location.pathname as a dependency

  // If it's the login page, render only the Outlet (login component)
  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <>
      <Navbar users={users} setUser={setUser} />
      <Outlet />
      <Footer />
    </>
  );
}
