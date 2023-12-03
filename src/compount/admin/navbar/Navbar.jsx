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
export default function Navbar() {
  return (
    <div className="back">
      <nav className={`navbar navbar-expand-lg z-2 w-100`}>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0  ">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/"
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
                      getAdmain
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/creatadmin">
                      createAdmain
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
                  categories
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admin/categories/get">
                      getcategories
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/categories/create">
                      createcategories
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                    <Link className="dropdown-item" to="">
                      updatecategories
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
                  users
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
