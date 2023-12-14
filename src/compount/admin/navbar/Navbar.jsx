import React, { useState, useEffect } from "react";
import "./Navbaradmin.css";
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
export default function Navbar({users,setUser}) {
  const navgite=useNavigate();
  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navgite("/login");
  };
  return (
    <div className="back">
      <nav className={`navbar navbar-expand-lg z-2 w-100`}>
        <div className="container">
          <Link to="/admin">
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0  ">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/admin"
                >
                  <FontAwesomeIcon icon={faHouse} className="pe-1" />
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" aria-current="page" href="#">
                  <FontAwesomeIcon icon={faEarthAmericas} className="pe-1" />
                  Trips
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admin/getAdmin">
                    Admin list
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/creatadmin">
                    Add admin
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admin/categories/get">
                    Categories list
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/categories/create">
                    Add Category
                    </Link>
                  </li>
                
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Operator
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admin">
                      Operators List
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/operator/catgeoriesselect">
                    Add Operator
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="">
                    Update Operator
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  aria-current="page"
                  to="/admin/users"
                >
                  Users
                </Link>
              </li>
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
                        <Link className="dropdown-item text-black" to="/login">
                          <FontAwesomeIcon
                            icon={faRightToBracket}
                            className="pe-3 text-success"
                          />
                          Login
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item text-black">
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
                          Log out
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
