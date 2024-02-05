import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Inpute from "../../shared/Inpute.jsx";
const initialValues = {
  image: "",
  name: "",
  status: "",
};

export default function Updatecategories() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [errorBackend, setErrorBackend] = useState("");

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", values.image);
      formData.append("status", values.status);
      try {
        const token = localStorage.getItem("userToken");
        const { data } = await axios.patch(
          `${import.meta.env.VITE_URL_LINK}/categories/${_id}`, // Replace :categoryId with the actual category ID you want to update
          formData,
          {
            headers: {
              Authorization: `ghazal__${token}`,
            },
          }
        );
        if (data.message === "success") {
          formik.resetForm();
          toast.success("Category updated successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/admin/categories/get");
        }
      }  catch (error) {
        setErrorBackend(error.response.data.message);
      }
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("image", event.target.files[0]);
  };

  const inputs = [
    {
      name: "name",
      type: "text",
      id: "name",
      title: "Category name",
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
      name: "image",
      type: "file",
      id: "image",
      title: "Category image",
      onChange: handleFileChange,
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
  return (
    <div className="bg-forms">
    <div className="container d-flex justify-content-center align-items-center vh-100">
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
