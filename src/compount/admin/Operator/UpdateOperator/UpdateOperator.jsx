import React, { useEffect, useState } from "react";
import Inpute from "../../../shared/Inpute";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../shared/Loader";
export default function UpdateOperator() {
  const { _id } = useParams();
  const [errorBackend, setErrorBackend] = useState("");
  const [loading, setLoading] = useState(false);

  const navgite = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      status: "",
      phoneNumber: "",
      password: "",
      image: "",
    },
    onSubmit: async (users) => {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("name", users.name);
      formdata.append("image", users.image);
      formdata.append("status", users.status);
      formdata.append("phoneNumber", users.phoneNumber);
      formdata.append("password", users.password);
      try {
        const token = localStorage.getItem("userToken");
        const { data } = await axios.patch(
          `${import.meta.env.VITE_URL_LINK}/operator/${_id}`,
          formdata,
          {
            headers: {
              Authorization: `ghazal__${token}`, 
            },
          }
        );
        if (data.message == "success") {
          formik.resetForm();
          toast.success("you seccess to update operator", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navgite("/admin");
        }
      } catch (error) {
        setErrorBackend(error.response.data.message);
      }finally{
        setLoading(false);
      }
    },
  });
  const handelFileChange = (event) => {
    formik.setFieldValue("image", event.target.files[0]);
  };

  const inputs = [
    {
      name: "name",
      type: "text",
      id: "name",
      title: "Agency Name",
      value: formik.values.name,
    },
    {
      name: "status",
      type: "select",
      id: "status",
      options: [
        "Active",
        "Inactive",
      ],
      value: formik.values.status,
    },
    {
      name: "phoneNumber",
      type: "number",
      id: "phoneNumber",
      title: "Agency phoneNumber",
      value: formik.values.phoneNumber,
    },
    {
      name: "password",
      type: "password",
      id: "password",
      title: "Agency Password",
      value: formik.values.password,
    },
    {
      name: "image",
      type: "file",
      id: "image",
      title: "Agency Image",
      onChange: handelFileChange,
    },
  ];

  const renderInput = inputs.map((input, index) => {
    if (input.type === "select") {
      return (
        <div key={index} className="mb-3">
          <label htmlFor={input.id} className="form-label">{input.title}</label>
          <select
            className="form-select"
            id={input.id}
            name={input.name}
            value={input.value}
            onChange={input.onChange || formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled>Select A Status</option>
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
          onChange={input.onChange || formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched}
          error={formik.errors}
        />
      );
    }
  });

  if(loading){
    return <Loader />;
  }
  return (
    <div className="bg-forms py-4">
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="p-4">
        <h2 className="text-center"></h2>
        <form onSubmit={formik.handleSubmit} className="forms-admin bg-white p-3">
          {renderInput}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!formik.isValid}
          >
            Update Tour
          </button>
          <div className="text-center w-100">
          {errorBackend && <p className="text text-danger">{errorBackend}</p>}
        </div>
        </form>
      </div>
    </div>
  </div>
  );
}
