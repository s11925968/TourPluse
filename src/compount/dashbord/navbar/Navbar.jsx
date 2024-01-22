import React, { useState, useEffect, useContext } from "react";
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
import { CompanyContext } from "../../web/context/company/Companycontext";
export default function Navbar() {
  const {company,setCompanycontext}=useContext(CompanyContext);
  console.log(company);
  const navgite=useNavigate();
  const logout = () => {
    localStorage.removeItem("companyToken");
    setCompanycontext(null);
    navgite("/logincompany");
  };
  return (
    <div className="back">
      <nav className={`navbar navbar-expand-lg z-2 w-100`}>
        <div className="container">
          <Link to="">
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
            <ul className="navbar-nav ms-auto mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to=""
                >
                  <FontAwesomeIcon icon={faHouse} className="pe-1" />
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/dashboard/selectCategories"
                  >
                  Add Tours
                </Link>
              </li>
              
              <li className="nav-item dropdown me-2">
                <a
                  className="nav-link dropdown-toggle text-white text-decoration-none"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faUser} className="pe-1 fs-4" />
                </a>
                <ul className="dropdown-menu dropdown-menu-start text-center">
                  {company !== null ? (
                    <>
                      <li>
                      <Link className="dropdown-item text-black" to={`/dashboard/company/profile/${company.id}`}>
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
                  ) : (
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
