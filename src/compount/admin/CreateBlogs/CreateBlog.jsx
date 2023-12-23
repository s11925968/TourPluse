import React from "react";
import Inpute from "../../shared/Inpute";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const initialValues = {
  title: "",
  description: "",
};
export default function Creatablogs() {
  const navigite = useNavigate();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("userToken");
        const { data } = await axios.post(
          `${import.meta.env.VITE_URL_LINK}/blog/createBlog`,values,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (data.message == "Success") {
          formik.resetForm();
          toast.success("account admin created succesfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigite("/admin/getAdmin");
        }
      } catch (error) {
        console.error("Error creating admin:", error);
      }
    },
  });
  const inputs = [

    {
      name: "title",
      type: "text",
      id: "title",
      title: "Title",
      value: formik.values.title,
    },
    {
      name: "description",
      type: "text",
      id: "description",
      title: "Description",
      value: formik.values.description,
    },
  ];

  const renderInput = inputs.map((input, index) => {
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
  });

  return (
    <div className="bg-forms vh-100">
      <div className="container py-4 d-flex justify-content-center align-items-center vh-100">
        <div className="phone-width">
          <form onSubmit={formik.handleSubmit} className="forms p-3">
          <h2>Create Blog</h2>
            {renderInput}
            <button type="submit" className="btn btn-primary w-100">
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
