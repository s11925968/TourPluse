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
import Loader from "../../shared/Loader";
import axios from "axios";
export default function Navbar({users,setUser}) {
  const token = localStorage.getItem('userToken');
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("");
  const navgite=useNavigate();
  const getProfile = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_LINK}/user/${users.id}`,
        {
          headers: {
            Authorization: `ghazal__${token}`
          }
        }
      );
      setData(data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }
  useEffect(() => {
    if (users) {
      getProfile();
    }
  }, [users]);

  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navgite("/login");
  };
  if(loader){
    return <Loader />;
  }
  return (
    <div className="back w-100">
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
            <ul className="navbar-nav ms-auto mb-lg-0  ">
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
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Blogs
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admin/blog/createBlog">
                      Add Blogs
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
                  Agency
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admin">
                    Agency List
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/operator/catgeoriesselect">
                    Add Agency
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="">
                    Update Agency
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
                  Tours
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admin/tour/get">
                      Tours List
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown me-2">
                <a
                  className="nav-link dropdown-toggle text-white text-decoration-none"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown" // Add data-bs-toggle attribute
                  aria-expanded="false"
                >
                  {data &&data?data.userName:"acount"}
                </a>
                <ul className="dropdown-menu dropdown-menu-start text-center">
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
                      <Link className="dropdown-item text-black" to={`/admin/user/profile/${users.id}`}>
                          <FontAwesomeIcon icon={faUser} className="pe-2"/>
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
