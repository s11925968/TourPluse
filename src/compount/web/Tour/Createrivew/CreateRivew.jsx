import React, { useEffect, useState } from "react";
import Inputs from "../../../shared/Inpute.jsx";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { registerReview } from "../../../shared/Validation.jsx";

export default function CreateReview({ users }) {
  const navigate = useNavigate();
  let [errorBack, setErrorBack] = useState("");

  useEffect(() => {
    if (!users) {
      return navigate("/login");
    }
  }, [users, navigate]);

  const { _id } = useParams();
  const initialValues = {
    comment: "",
    rating: "",
  };

  const onSubmit = async (users) => {
    const token = localStorage.getItem("userToken");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_LINK}/tour/${_id}/review`,
        users,
        {
          headers: {
            Authorization: `ghazal__${token}`,
          },
        }
      );

      if (data.message === "success") {
        toast.success("Review submitted successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate(`/tour/details/${_id}`);
      }
    } catch (error) {
      setErrorBack(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: registerReview,
  });

  const inputs = [
    {
      id: "comment",
      type: "text",
      name: "comment",
      title: "Comment",
      value: formik.values.comment,
    },
    {
      id: "rating",
      type: "number",
      name: "rating",
      title: "Rating",
      value: formik.values.rating,
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
    <div className="bg-forms">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="phone-width">
          <div className="">
            <form onSubmit={formik.handleSubmit} className="forms p-3">
              <h2 className="text-center">Create Review</h2>
              {renderInput}
              <button
                type="submit"
                disabled={!formik.isValid}
                className="w-100"
              >
                Submit
              </button>
              <div className="text-center w-100">
                {errorBack && <p className="text text-danger">{errorBack}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
