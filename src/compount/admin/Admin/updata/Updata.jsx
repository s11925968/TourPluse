import React, { useState } from "react";
import Inpute from "../../../shared/Inpute";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../shared/Loader";

const initialValues = {
  userName: "",
  email: "",
  password: "",
  role: "",    // Single role selection
  status: "",  // Single status selection
};

export default function Updata() {
  const { _id } = useParams();
  let [errorBack, setErrorBack] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const token = localStorage.getItem("userToken");
        const { data } = await axios.patch(
          `${import.meta.env.VITE_URL_LINK}/admin/${_id}`,
          values,
          {
            headers: {
              Authorization: `ghazal__${token}`,
            },
          }
        );
        if (data.message === "success") {
          formik.resetForm();
          toast.success("Update account successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/admin/getAdmin");
        }
      } catch (error) {
        setErrorBack(error.response.data.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const inputs = [
    {
      name: "userName",
      type: "text",
      id: "userName",
      title: "New Name",
      value: formik.values.userName,
    },
    {
      name: "email",
      type: "email",
      id: "email",
      title: "New Email",
      value: formik.values.email,
    },
    {
      name: "password",
      type: "password",
      id: "password",
      title: "New Password",
      value: formik.values.password,
    },
    {
      name: "status",
      type: "select",
      id: "status",
      title:"New Status",
      options: ["Active", "Inactive"],
      value: formik.values.status,
    },
    {
      name: "role",
      type: "select",
      id: "role",
      title:"New Role",
      options: ["Superadmin", "Admin"],
      value: formik.values.role,
    },
  ];

  const renderInput = inputs.map((input, index) => {
    if (input.type === "select") {
      return (
        <div key={index} className="mb-3">
          <label htmlFor={input.id} className="form-label">
            {input.title}
          </label>
          <select
            className="form-select"
            id={input.id}
            name={input.name}
            value={input.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled>
              {`select`}
            </option>
            {input.options.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
          {formik.touched[input.name] && formik.errors[input.name] && (
            <div className="text-danger">{formik.errors[input.name]}</div>
          )}
        </div>
      );
    } else {
      return (
        <Inpute
          key={index}
          name={input.name}
          type={input.type}
          title={input.title}
          id={input.id}
          value={input.value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched}
          error={formik.errors}
        />
      );
    }
  });

  if (loading) {
    return <Loader />;
  }

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
              Update User
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
