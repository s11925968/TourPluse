import React, { useEffect } from "react";
import Inputs from "../../shared/Inpute.jsx";
import { useFormik } from "formik";
import axios from "axios";
import style from './Profile.module.css';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {registerChangeEmail } from "../../shared/Validation.jsx";
export default function ChangeEmail() {
  const navigte = useNavigate();
  const { _id } = useParams();
  const initialValues = {
    password: "",
    newEmail: "",
  };
  const onSubmit = async (users) => {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_URL_LINK}/user/changeEmail/${_id}`,users);
    if (data.message == "success") {
      toast.success("success to change the password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigte("/");
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema:registerChangeEmail,

  });

  const inputs = [
    {
      id: "newEmail",
      type: "email",
      name: "newEmail",
      title: "New Email",
      value: formik.values.newEmail,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: "Password",
      value: formik.values.password,
    },
  ];
  const renderInput = inputs.map((input, index) => (
    <Inputs
      type={input.type}
      key={index}
      id={input.id}
      name={input.name}
      title={input.title}
      value={input.value}
      error={formik.errors}
      onChange={input.onChange || formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched}
    />
  ));
  return (
      <div className="container   d-flex justify-content-center align-items-center">
        <div className="phone-width ">
          <div className="">
            <form onSubmit={formik.handleSubmit} className={style.ChangePassword}>
              {renderInput}
              <button
                type="submit"
                disabled={!formik.isValid}
                className="w-100"
              >
                Change Email
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
