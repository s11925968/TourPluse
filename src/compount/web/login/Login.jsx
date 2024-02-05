import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Inpute from "../../shared/Inpute";
import { Link, useNavigate } from "react-router-dom";
import "./loginstyle.css";

// ... (previous imports)

export default function Login({ saveCurrentUser, users }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorBackend, setErrorBackend] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (user) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_LINK}/auth/signin`,
        user
      );

      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        saveCurrentUser();

        if (users) {
          const userRole = users.role;
          if (userRole === "User") {
            navigate("/");
            toast.success("login successfully", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            navigate("/admin");
            toast.success("login successfully", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      }
    } catch (error) {
      setErrorBackend(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div className="bg-forms">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="phone-width">
          <form onSubmit={formik.handleSubmit} className="forms p-3">
            <Inpute
              type="email"
              id="email"
              title="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched}
              error={formik.errors}
            />
            <div className="d-flex justify-content-between align-items-center">
              <Inpute
                type={showPassword ? "text" : "password"}
                id="password"
                title="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched}
                error={formik.errors}
              />
              <div className="form-check d-flex align-items-center">
              <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="ms-2"
                  onClick={() => setShowPassword(!showPassword)}
                />
                <div className="d-block ms-2">
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={!formik.isValid}
            >
              Log in
            </button>
            <Link to="/auth/sendCode" className="btn btn-primary mt-4">
              Forget Password
            </Link>
            <div className="text-center w-100">
            {errorBackend && (
              <p className="text text-danger">{errorBackend}</p>
            )}
          </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}
