import React, { useEffect } from "react";
import Inputs from "../../../shared/Inpute.jsx";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { registerReview } from "../../../shared/Validation.jsx";
export default function CreateRivew({users}) {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!users){
      return navigate('/login');
    }
  },[])
  const { _id } = useParams();
  const initialValues = {
    comment: "",
    rating: "",
  };
  const onSubmit = async (users) => {
    const token = localStorage.getItem("userToken");
    const { data } = await axios.post(
      `${import.meta.env.VITE_URL_LINK}/operator/${_id}/reviewOp`,
      users,
      {
        headers: {
          Authorization: `ghazal__${token}`,
        },
      }
    );
    if (data.message == "success") {
      toast.success("review success", {
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
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema:registerReview,

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
              {renderInput}
              <button type="submit" disabled={!formik.isValid} className="w-100">
                Create Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
