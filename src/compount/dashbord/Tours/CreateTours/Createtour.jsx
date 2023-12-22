import React, { useContext, useState } from "react";
import Inpute from "../../../shared/Inpute";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../shared/Loader.jsx";
import { CompanyContext } from "../../../web/context/company/Companycontext";
export default function CreatTour() {
  const { company } = useContext(CompanyContext);
  const [errorBackend, setErrorBackend] = useState("");
  const [loading, setLoading] = useState(false);
  const operators = company?.id || null;
  console.log(company);
  const { _id } = useParams();
  const navgite = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      operatorId: operators,
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
    onSubmit: async (users) => {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("name", users.name);
      formdata.append("image", users.image);
      formdata.append("operatorId", users.operatorId);
      formdata.append("price", users.price);
      formdata.append("discount", users.discount);
      formdata.append("location", users.location);
      formdata.append("duration", users.duration);
      formdata.append("description", users.description);
      formdata.append("endDate", users.endDate);
      formdata.append("startDate", users.startDate);
      formdata.append("meals", users.meals);
      formdata.append("whatToPack", users.whatToPack);
      formdata.append("lastRegDate", users.lastRegDate);
      formdata.append("note", users.note);
      formdata.append("tourPlan", users.tourPlan);
      formdata.append("categoryId", users.categoryId);

      try {
        const token = localStorage.getItem("companyToken");
        const { data } = await axios.post(
          `${import.meta.env.VITE_URL_LINK}/tour/create`,
          formdata,
          {
            headers: {
              Authorization: `ghazal__${token}`, // Replace YOUR_TOKEN_HERE with your actual token
            },
          }
        );

        if (data.message == "success") {
          formik.resetForm();
          toast.success("you seccess create tour", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navgite("/dashboard/tour/getActive");
        }
      } catch (error) {
        setErrorBackend(error.response.data.message);
      } finally {
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
      title: "StartDate",
      value: formik.values.startDate,
    },
    {
      name: "endDate",
      type: "date",
      id: "endDate",
      title: "EndDate",
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
  if (loading) {
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
          <div className="text-center w-100">
              {errorBackend && (
                <p className="text text-danger">{errorBackend}</p>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
