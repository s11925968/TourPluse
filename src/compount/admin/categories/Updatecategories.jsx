import React from "react";
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
      } catch (error) {
        console.error("Error updating category:", error);
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
      name: "image",
      type: "file",
      id: "image",
      title: "Category image",
      onChange: handleFileChange,
    },
    {
      name: "status",
      type: "text",
      id: "status",
      title: "Category status",
      value: formik.values.status,
    },
  ];

  const renderInput = inputs.map((input, index) => (
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
  ));

  return (
    <div className="bg-forms">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div>
          <h2 className="text-center">Update category</h2>
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            {renderInput}
            <button type="submit" className="w-100">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
