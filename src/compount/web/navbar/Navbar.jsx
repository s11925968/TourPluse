// Navbar.js
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCircleExclamation,
  faCircleUser,
  faEarthAmericas,
  faHouse,
  faPlane,
  faRightToBracket,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loader from "../../shared/Loader";

export default function Navbar({ users, setUser }) {
  const token = localStorage.getItem("userToken");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("");
  const navgite = useNavigate();
  const [navbarBackground, setNavbarBackground] = useState("");
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) {
      setNavbarBackground("#4b5357");
      setHasScrolled(true);
    } else {
      setNavbarBackground("");
      setHasScrolled(false);
    }
  };

  const handleAboutClick = () => {
    const aboutElement = document.getElementById("about");
    if (aboutElement) {
      aboutElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getProfile = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_LINK}/user/${users.id}`,
        {
          headers: {
            Authorization: `ghazal__${token}`,
          },
        }
      );
      setData(data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

 

  const logout = () => {
    if (!users) {
      return;
    }

    localStorage.removeItem("userToken");
    setUser(null);
    navgite("/");
  };
  useEffect(() => {
    if (users) {
      getProfile();
    }else{
      logout();
    }
  }, [users]);
  if (loader) {
    return <Loader />;
  }

  return (
    <div className="back w-100 d-flex justify-content-center">
      <nav
        className={`navbar navbar-expand-lg z-2 position-fixed`}
        style={{ backgroundColor: navbarBackground }}
      >
        <div className="container">
          <Link to="/">
            <img
              src="/images/fulllogo_transparent_nobuffer.png"
              alt="logo"
              className={`logo ${hasScrolled ? "scrolled" : ""} ${hasScrolled ? "logo-small" : ""}`}
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active text-white" aria-current="page">
                  <FontAwesomeIcon icon={faHouse} className="pe-1" />
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" aria-current="page" to="/tourlistweb">
                  <FontAwesomeIcon icon={faEarthAmericas} className="pe-1" />
                  Tours
                </Link>
              </li>
              {users && (
                <li className="nav-item">
                  <Link className="nav-link text-white" aria-current="page" to="/catagouries">
                    <FontAwesomeIcon icon={faPlane} className="pe-1" />
                    Agencies
                  </Link>
                </li>
              )}
                
              <li className="nav-item dropdown me-2 ">
                <a
                  className="nav-link dropdown-toggle text-white text-decoration-none"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faCircleUser}className="me-1" />
                  {data && data ? data.userName : "Account"}
                </a>
                <ul className="dropdown-menu dropdown-menu-start">
                  {!users ? (
                    <>
                      <li>
                        <Link className="dropdown-item text-black" to="/register">
                          <FontAwesomeIcon icon={faUserPlus} className="pe-1 text-success" />
                          Sign up
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-black" to="/login">
                          <FontAwesomeIcon icon={faRightToBracket} className="pe-2 text-success" />
                          Sign in
                        </Link>
                      </li>
                      <hr className="m-0" />
                      <li className="nav-item">
                        <Link
                          to="/logincompany"
                          className="nav-link text-black"
                          aria-current="page"
                          href="#"
                        >
                          <FontAwesomeIcon icon={faBuilding} className="pe-1 text-success" />
                          Sign in as Agency
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          className="dropdown-item text-black"
                          to={`/user/profile/${users.id}`}
                        >
                          <FontAwesomeIcon icon={faUser} className="pe-2" />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-black" onClick={logout}>
                          <FontAwesomeIcon icon={faRightToBracket} className="pe-2 text-danger" />
                          Logout
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>

              <li className="nav-item  text-info"></li>
              <li className="nav-item ">
                <Link
                  to="/about"
                  className="about btn nav-link btn-link text-decoration-none text-start"
                >
                  <FontAwesomeIcon icon={faCircleExclamation} className="pe-1" />
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
