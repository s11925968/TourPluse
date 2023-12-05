import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import Inpute from "../../shared/Inpute";
import { useNavigate } from "react-router-dom";

export default function Login({saveCurrentUser,users}) {
  const navigate=useNavigate();
const initialValues = {
  email: "",
  password: "",
};

const onSubmit = async (user) => {
  const { data } =await axios.post("https://gazaaaal.vercel.app/auth/signin",user);
  
  if(data.message=="success")
  {
    
    localStorage.setItem("userToken",data.token);
    saveCurrentUser();
    
      if (users) {
        // Check the role in the users state
        const userRole = users.role;
    
        if (userRole === "User") {
          navigate('/');
          toast.success('login succesfully', {
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
          navigate("/admin/home")
          toast.success('login succesfully', {
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
};
  const formik = useFormik({
    initialValues,
    onSubmit,
    //validationSchema:registerValidation,
  });
  const inputs = [
    {
      type: "email",
      name: "email",
      id: "email",
      title: "user email",
      value: formik.values.email,
    },
    {
      type: "password",
      name: "password",
      id: "password",
      title: "user password",
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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="phone-width">
        <h2>create account</h2>
        <form onSubmit={formik.handleSubmit} className="forms p-3">
          {renderInput}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!formik.isValid}
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
