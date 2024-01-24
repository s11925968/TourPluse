import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { registerInterests, registerValidation } from "../../shared/Validation";
import Inpute from "../../shared/Inpute";
import { useNavigate, useParams } from "react-router-dom";
import './Recommender.css'
const initialValues = {
  interests: [],
};
export default function Register() {
  const { _id } = useParams();
  const navigate = useNavigate();
  let [errorBack, setErrorBack] = useState("");
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          `${
            import.meta.env.VITE_URL_LINK
          }/user/addInterests/${_id}`,
          values
        );
        
        console.log(data);
        if(data.message=="Interests updated successfully."){
          toast.success(
            "Add Interest succesfully",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          navigate(`/login`);
        }
      } catch (e) {
        console.error("Error fetching user search data:", e);
      }
    },
    validationSchema: registerInterests,
  });

  const handleInterestChange = (interest) => {
    const { interests } = formik.values;

    // Toggle the selected interest
    const updatedInterests = interests.includes(interest)
      ? interests.filter((item) => item !== interest)
      : [...interests, interest];

    // Update the formik values
    formik.setFieldValue("interests", updatedInterests);
  };

  const interestsWithImages = [
    {
      name: "Islamic",
      imageSrc: "/recommender/Islamic.jpg",
    },
    {
      name: "Cultural",
      imageSrc: "/recommender/Cultural.jpg",
    },
    {
      name: "Historical",
      imageSrc: "/recommender/Historical.jpg",
    },
    {
      name: "Educational",
      imageSrc: "/recommender/Educational.jpg",
    },
    {
      name: "Adventure",
      imageSrc: "/recommender/Adventure.jpg",
    },
    {
      name: "Relaxation",
      imageSrc: "/recommender/Relaxation.jpg",
    },
    {
      name: "Nautical",
      imageSrc: "/recommender/Nautical.jpg",
    },
    {
      name: "Camping",
      imageSrc: "/recommender/Camping.jpg",
    },
    {
      name: "Couples",
      imageSrc: "/recommender/Couples.jpg",
    },
    {
      name: "Natural",
      imageSrc: "/recommender/Natural.jpg",
    },
  ];

  const renderInterests = interestsWithImages.map((interestData) => (
    <div key={interestData.name} className="form-check form-check-inline">
      <img
        className="my-3 m-auto w-100 imgage-intersts"
        src={interestData.imageSrc}
        alt={interestData.name}
        style={{ width: "50px", height: "50px", marginRight: "10px" }}
      />
      <input
        type="checkbox"
        id={interestData.name}
        name="interests"
        value={interestData.name}
        checked={formik.values.interests ? formik.values.interests.includes(interestData.name) : false}
        onChange={() => handleInterestChange(interestData.name)}
      />
      <label htmlFor={interestData.name} className="form-check-label w-100 text-center">
        {interestData.name}
      </label>
    </div>
  ));

  return (
    <div className="bg-forms">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="phone-width">
          <form onSubmit={formik.handleSubmit} className="forms p-3">
            <div className="mb-3">
              <label>Interests (Choose three)</label>
              <div>{renderInterests}</div>
              {formik.touched.interests && formik.errors.interests && (
                <div className="text-danger">{formik.errors.interests}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={!formik.isValid}
            >
              Add Interests
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
