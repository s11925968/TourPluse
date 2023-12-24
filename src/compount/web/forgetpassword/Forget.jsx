import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import "./forgetpassword.css";
import { registerValidationForget } from "../../shared/Validation";
import Inpute from "../../shared/Inpute";
import { useNavigate } from "react-router-dom";
const initialValues = {
  email: "",
  password: "",
  code: "",
};

export default function Register() {
  const navigite = useNavigate();
  let [errorBack, setErrorBack] = useState("");
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_URL_LINK}/auth/forgetPassword`,
          values
        );
        if (data.message == "success") {
          toast.success("change password success", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigite("/");
        }
      } catch (error) {
        setErrorBack(error.response.data.message);
      }
    },
    validationSchema: registerValidationForget,
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
      title: "new password",
      value: formik.values.password,
    },
    {
      type: "text",
      name: "code",
      id: "code",
      title: "Code",
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
          <form onSubmit={formik.handleSubmit} className="forms p-3">
            {renderInput}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={!formik.isValid}
            >
              change password
            </button>
          </form>
          <div className="text-center w-100">
            {errorBack && <p className="text text-danger">{errorBack}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
