import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import "./register.css";
import { registerValidation } from "../../shared/Validation";
import Inpute from "../../shared/Inpute";
import { useNavigate } from "react-router-dom";
const initialValues = {
  userName: "",
  email: "",
  password: "",
  age: "",
};

export default function Register() {
  const navigite = useNavigate();
  let [errorBack, setErrorBack] = useState("");
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          "https://gazaaaal.vercel.app/auth/signup",
          values
        );
        console.log(data);
        if (data.message == "success") {
          formik.resetForm();
          toast.success(
            "please verify your email to login",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          navigite(`/Recommender/${data.user}`);
        }
      } catch (error) {
        setErrorBack(error.response.data.message);
      }
    },
    validationSchema: registerValidation,
  });
  const inputs = [
    {
      type: "text",
      name: "userName",
      id: "userName",
      title: "Name",
      value: formik.values.userName,
    },
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
      title: "New password",
      value: formik.values.password,
    },
    {
      type: "password",
      name: "confirmPassword",
      id: "confirmPassword",
      title: "Re-enter password",
    },
    {
      type: "number",
      name: "age",
      id: "age",
      title: "Age",
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
              className="btn btn-primary"
              disabled={!formik.isValid}
            >
              Create new account
            </button>
            <div className="text-center w-100">
              {errorBack && <p className="text text-danger">{errorBack}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
