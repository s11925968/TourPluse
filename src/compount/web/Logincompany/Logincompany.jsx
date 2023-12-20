import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import Inpute from "../../shared/Inpute";
import { Link, useNavigate } from "react-router-dom";
import { CompanyContext } from "../../web/context/company/Companycontext.jsx";

export default function Logincompany() {
  const { setCompanycontext } = useContext(CompanyContext);
  const navigate = useNavigate();
  const [errorBackend, setErrorBackend] = useState(""); // Fix: Use const instead of let

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (user) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_LINK}/auth/tourOperator/signin`,
        user
      );
      if (data.message == "success") {
        localStorage.setItem("companyToken", data.token);
        setCompanycontext();
        navigate("/dashboard");
        toast.success("login succesfully", {
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
    } catch (error) {
      setErrorBackend(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    // validationSchema: registerValidation,
  });

  const inputs = [
    {
      type: "email",
      name: "email",
      id: "email",
      title: "Email",
      value: formik.values.email,
    },
    {
      type: "password",
      name: "password",
      id: "password",
      title: "Password", // Fix: Corrected the title
      value: formik.values.password,
    },
  ];

  const renderInput = inputs.map((value, index) => (
    <Inpute
      type={value.type}
      id={value.id}
      title={value.title}
      key={index}
      name={value.name}
      value={value.value}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
      error={formik.errors}
    />
  ));

  return (
    <div className="bg-forms">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="phone-width">
          <h2>Log in</h2>
          <form onSubmit={formik.handleSubmit} className="forms p-3">
            {renderInput}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={!formik.isValid}
            >
              Submit
            </button>
            <Link to="/auth/sendCode" className="btn btn-primary mt-4">
              Forgot Password
            </Link>
          </form>
          <div className="text-center w-100">
            {errorBackend && <p className="text text-danger">{errorBackend}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
