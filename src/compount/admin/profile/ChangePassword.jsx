import React, { useEffect } from "react";
import Inputs from "../../shared/Inpute.jsx";
import { useFormik } from "formik";
import axios from "axios";
import style from './Profile.module.css';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { registerChangePassword } from "../../shared/Validation.jsx";
export default function ChangePassword() {
  const navigte = useNavigate();
  const { _id } = useParams();
  const initialValues = {
    password: "",
    newPassword: "",
    confirmPassword:"",
  };
  const onSubmit = async (users) => {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_URL_LINK}/user/changePassword/${_id}`,users,);
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
    validationSchema:registerChangePassword,

  });

  const inputs = [
    {
      id: "password",
      type: "password",
      name: "password",
      title: "Password",
      value: formik.values.password,
    },
    {
      id: "newPassword",
      type: "password",
      name: "newPassword",
      title: "NewPassword",
      value: formik.values.newPassword,
    },
    {
      id: "confirmPassword",
      type: "password",
      name: "confirmPassword",
      title: "ConfirmPassword",
      value: formik.values.confirmPassword,
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
                className="button w-100"
              >
                Change Passwrod
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
