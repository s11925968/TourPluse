import React, { useContext, useState } from "react";
import Inpute from "../../../shared/Inpute";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../shared/Loader.jsx";
import { CompanyContext } from "../../../web/context/company/Companycontext";
import { registerCreateTour } from "../../../shared/Validation.jsx";

export default function CreatTour() {
  const { company } = useContext(CompanyContext);
  const [errorBackend, setErrorBackend] = useState(null);
  const [loading, setLoading] = useState(false);
  const id = company?.id || null;
  const { _id } = useParams();
  const navgite = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      operatorId: id,
      price: "",
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
              Authorization: `ghazal__${token}`,
            },
          }
        );

        if (data.message === "success") {
          formik.resetForm();
          toast.success("you successfully created a tour", {
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
        console.log("samehj");
        console.log(error);
        setErrorBackend(error?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    validationSchema: registerCreateTour,

  });

  const handelFileChange = (event) => {
    formik.setFieldValue("image", event.target.files[0]);
  };

  const inputs = [
    {
      name: "name",
      type: "text",
      id: "name",
      title: "Name",
      value: formik.values.name,
    },
    {
      name: "price",
      type: "text",
      id: "price",
      title: "Price",
      value: formik.values.price,
    },
    {
      name: "location",
      type: "select",
      id: "location",
      options: [
        "Saudi Arabia",
        "South America",
        "Germany",
        "Egypt",
        "India",
        "Maldives",
        "America",
        "Palestine",
        "Austria",
        "Belgium",
        "Belgium / Luxembourg",
        "Bulgaria",
        "Croatia",
        "Cyprus",
        "Czechia",
        "Denmark",
        "Estonia",
        "Finland",
        "France",
        "Germany",
        "Greece",
        "Hungary",
        "Ireland",
        "Italy",
        "Latvia",
        "Lithuania",
        "Luxembourg",
        "Malta",
        "Netherlands",
        "Poland",
        "Portugal",
        "Romania",
        "Slovakia",
        "Slovenia",
        "Spain",
        "Sweden",
      ],
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
      title: "What To Pack",
      value: formik.values.whatToPack,
    },
    
    {
      name: "note",
      type: "text",
      id: "note",
      title: "Note",
      value: formik.values.note,
    },
    {
      name: "tourPlan",
      type: "text",
      id: "tourPlan",
      title: "Tour Plan",
      value: formik.values.tourPlan,
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
      name: "lastRegDate",
      type: "date",
      id: "lastRegDate",
      title: "Last Registration Date",
      value: formik.values.lastRegDate,
    },
    {
      name: "image",
      type: "file",
      id: "image",
      title: "Agencies Image",
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
            <option value="" disabled>Select A Location</option>
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-forms py-4">
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className=" p-4">
          <h2 className="text-center"></h2>
          <form onSubmit={formik.handleSubmit} className="forms p-3">
            {renderInput}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={!formik.isValid}
            >
              Add Tour
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