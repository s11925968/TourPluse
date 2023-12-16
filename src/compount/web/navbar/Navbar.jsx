import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleExclamation,
  faEarthAmericas,
  faEnvelope,
  faHouse,
  faPlane,
  faRightToBracket,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
export default function Navbar({ users, setUser }) {
  console.log(users);
  const navgite = useNavigate();
  const [navbarBackground, setNavbarBackground] = useState(""); // State to manage navbar background color
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Adding scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll); // Removing scroll event listener on component unmount
    };
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    // Change background color if the user has scrolled, for example, 100 pixels
    if (scrollPosition > 100) {
      setNavbarBackground("#4b5357");
    } else {
      setNavbarBackground(""); // Revert back to default background color
    }
  };
  const handleAboutClick = () => {
    const aboutElement = document.getElementById('about');
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // function setSweet() {
  //   Swal.fire({
  //     title:
  //       "Tourpulse is a company based in Palestine that specializes in providing travel and tourism services. Established with the aim of creating memorable and seamless travel experiences, Tourpulse is committed to offering exceptional services to both local and international travelers.",
  //     showClass: {
  //       popup: "animate__animated animate__fadeInDown",
  //     },
  //     hideClass: {
  //       popup: "animate__animated animate__fadeOutUp",
  //     },
  //   });
  // }

  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navgite("/");
  };
  return (
    <div className="back">
      <nav
        className={`navbar navbar-expand-lg z-2 position-fixed`}
        style={{ backgroundColor: navbarBackground }} // Set dynamic background color based on state
      >
        <div className="container">
          <Link to="/">
            <img
              src="/images/fulllogo_transparent_nobuffer.png"
              alt="logo"
              className="logo"
            />
          </Link>
          <button
            className="navbar-toggler bg-primary bg-gradient"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="text-info-navbar collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0  ">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  // to={users&&users.role === "Users" ? "/" : "/admin"}
                >
                  <FontAwesomeIcon icon={faHouse} className="pe-1" />
                  Home
                </Link>
              </li>
              {users && (
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    aria-current="page"
                    href="#"
                  >
                    Tourism
                  </a>
                </li>
              )}
              {!users && (
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    aria-current="page"
                    href="#"
                  >
                    agency
                  </a>
                </li>
              )}
              <li className="nav-item">
                <a className="nav-link text-white" aria-current="page" href="#">
                  <FontAwesomeIcon icon={faEarthAmericas} className="pe-1" />
                  Trips
                </a>
              </li>
              {users && (
                <li className="nav-item">
                  <Link
                    className="nav-link  text-white"
                    aria-current="page"
                    to="/catagouries"
                  >
                    <FontAwesomeIcon icon={faPlane} className="pe-1" />
                    Tourism Company
                  </Link>
                </li>
              )}
              <li className="nav-item dropdown me-2 mb-4">
                <a
                  className="nav-link dropdown-toggle text-white text-decoration-none"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown" // Add data-bs-toggle attribute
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faUser} className="pe-1 fs-4" />
                </a>
                <ul className="dropdown-menu dropdown-menu-start mb-2 text-center">
                  {!users ? (
                    <>
                      <li>
                        <Link
                          className="dropdown-item text-black"
                          to="/register"
                        >
                          <FontAwesomeIcon
                            icon={faUserPlus}
                            className="pe-1 text-success"
                          />
                          Sign up
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-black" to="/login">
                          <FontAwesomeIcon
                            icon={faRightToBracket}
                            className="pe-2 text-success"
                          />
                          Sign in
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item text-black" to="/user/profile/444">
                          <FontAwesomeIcon icon={faUser} className="pe-2" />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-black"
                          onClick={logout}
                        >
                          <FontAwesomeIcon
                            icon={faRightToBracket}
                            className="pe-2 text-danger"
                          />
                          Logout
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>

              <li className="nav-item  text-info"></li>
              <li className="nav-item ">
                {
                  // Inside Navbar.jsx
                  <Link
                    to="/about"
                    className="about btn nav-link btn-link text-decoration-none text-start"
                  >
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      className="pe-1"
                    />
                    About
                  </Link>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
