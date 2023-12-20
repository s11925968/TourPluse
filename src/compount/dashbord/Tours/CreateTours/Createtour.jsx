import React, { useContext, useEffect, useState } from "react";
import Inpute from "../../../shared/Inpute";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyContext } from "../../../web/context/company/Companycontext";
import Loader from "../../../shared/Loader";

export default function CreatTour() {
  const { company } = useContext(CompanyContext);
  const [isLoading, setLoading] = useState(true);
  const { _id } = useParams();
  const navigate = useNavigate();
  
  console.log(company);
  
  const formik = useFormik({
    initialValues: {
      name: "",
      image: null,
      operatorId: company?.id || "",
      price: "",
      discount: "",
      location: "",
      duration: "",
      endDate: "",
      startDate: "",
      meals: "",
      whatToPack: "",
      lastRegDate: "",
      note: "",
      tourPlan: "",
      categoryId: _id,
      description: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("image", values.image);
        formData.append("operatorId", values.operatorId);
        formData.append("price", values.price);
        formData.append("discount", values.discount);
        formData.append("location", values.location);
        formData.append("duration", values.duration);
        formData.append("description", values.description);
        formData.append("endDate", values.endDate);
        formData.append("startDate", values.startDate);
        formData.append("meals", values.meals);
        formData.append("whatToPack", values.whatToPack);
        formData.append("lastRegDate", values.lastRegDate);
        formData.append("note", values.note);
        formData.append("tourPlan", values.tourPlan);
        formData.append("categoryId", values.categoryId);

        const token = localStorage.getItem("companyToken");
        const { data } = await axios.post(
          `${import.meta.env.VITE_URL_LINK}/tour/create`,
          formData,
          {
            headers: {
              Authorization: `ghazal__${token}`,
            },
          }
        );

        if (data.message === "success") {
          setLoading(false);
          formik.resetForm();
          toast.success("Tour created successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/dashboard/tour/getActive");
        }
      } catch (error) {
        console.error("Error creating tour:", error);
        setLoading(false); // Set loading to false on error
      }
    },
  });

  useEffect(() => {
    setLoading(false);
  }, [company]);
  const handelFileChange = (event) => {
    formik.setFieldValue("image", event.target.files[0]);
  };

  const inputs = [
    {
      name: "name",
      type: "text",
      id: "name",
      title: "Operator Name",
      value: formik.values.name,
    },
    {
      name: "price",
      type: "number",
      id: "price",
      title: "Price",
      value: formik.values.price,
    },
    {
      name: "discount",
      type: "number",
      id: "discount",
      title: "discount",
      value: formik.values.discount,
    },
    {
      name: "location",
      type: "text",
      id: "location",
      title: "location",
      value: formik.values.location,
    },
    {
      name: "duration",
      type: "number",
      id: "duration",
      title: "Duration",
      value: formik.values.duration,
    },
    {
      name: "description",
      type: "text",
      id: "description",
      title: "Description",
      value: formik.values.description,
    },
    {
      name: "startDate",
      type: "date",
      id: "startDate",
      title: "Start Date",
      value: formik.values.startDate,
    },
    {
      name: "endDate",
      type: "date",
      id: "endDate",
      title: "End Date",
      value: formik.values.endDate,
    },
    {
      name: "meals",
      type: "text",
      id: "meals",
      title: "Meals",
      value: formik.values.meals,
    },
    {
      name: "whatToPack",
      type: "text",
      id: "whatToPack",
      title: "whatToPack",
      value: formik.values.whatToPack,
    },
    {
      name: "lastRegDate",
      type: "date",
      id: "lastRegDate",
      title: "LastRegDate",
      value: formik.values.lastRegDate,
    },
    {
      name: "note",
      type: "text",
      id: "note",
      title: "note",
      value: formik.values.note,
    },
    {
      name: "tourPlan",
      type: "text",
      id: "tourPlan",
      title: "tourPlan",
      value: formik.values.tourPlan,
    },
    {
      name: "image",
      type: "file",
      id: "image",
      title: "Operator Image",
      onChange: handelFileChange,
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
        onChange={input.onChange || formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched}
        error={formik.errors}
      />
    );
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="bg-forms py-4">
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="forms p-4">
          <h2 className="text-center"></h2>
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            {renderInput}
            <button type="submit" className="w-100">
              Add tour
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
