import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../shared/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import './DetilsTour.css'
export default function DetilsTour() {
  const { _id } = useParams();
  const [data, setDataTour] = useState("");
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const currentDate = new Date().toLocaleDateString("en-CA");
  const notEqualValue = ".";

  const getTours = async () => {
    try {
      setIsLoading(true); // Set loading to true when starting the request
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_LINK}/tour/get/${_id}`
      );
      setDataTour(data.tour);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading to false after the request completes
    }
  };
  const calculateAvgRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round(totalRating / reviews.length);
  };
  const dataDate = {
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  };
  const isLastRegDateValid = (lastRegDate, currentDate) => {
    // Implement your logic for checking if lastRegDate is still valid
    return lastRegDate >= currentDate;
  };

  const lastRegDateValid = isLastRegDateValid(data.lastRegDate, currentDate);
  useEffect(() => {
    getTours();
  }, [_id]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container">
      
    <div className="tourlist-web">
      <div className="">
        <h2>{data.name}</h2>
      </div>
      <div className="row">
        <>
          <div key={data._id} className="col-lg-6 mb-4">
            <div className="image">
              <img src={data.image.secure_url} alt={data.name}className="w-100" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-3 w-10">
                <p>
                  <strong className="">Price: $</strong>
                  {data.price}
                </p>
                <p>
                  <strong>Start Date: </strong>
                  {new Date(dataDate.startDate).toLocaleDateString()}
                </p>
                {data.whatToPack ? (
                  <p>
                    <strong>What To Pack: </strong>
                    {data.whatToPack}
                  </p>
                ) : null}
                <p>
                  <strong>Last Reg Date: </strong>
                  <span style={{ color: lastRegDateValid ? "green" : "red" }}>
                    {new Date(data.lastRegDate).toLocaleDateString()}
                  </span>
                </p>
              </div>
              <div className="col-lg-3 w-50">
                <p>
                  <strong>Location: </strong> {data.location}
                </p>
                <p>
                  <strong>End Date: </strong>
                  {new Date(dataDate.endDate).toLocaleDateString()}
                </p>
                <div>
                  {data.meals ? (
                    <p>
                      <strong>Meals: </strong>
                      {data.meals}
                    </p>
                  ) : null}
                </div>
                <p>
                  {data.note ? (
                    <p>
                      <strong>Note: </strong>
                      {data.note}
                    </p>
                  ) : null}
                </p>
              </div>
              {data.tourPlan !== notEqualValue && (
                <p>
                  <strong>Tour Plan:</strong> {data.tourPlan}
                </p>
              )}
              <p>
                <strong>Description:</strong> {data.description}
              </p>
              <p className="py-3 fs-2 text-center">
                {Array.from({
                  length: calculateAvgRating(data.reviews),
                }).map((_, starIndex) => (
                  <FontAwesomeIcon
                    key={starIndex}
                    icon={faStar}
                    className="text-warning"
                  />
                ))}
              </p>
              <div className="d-flex justify-content-center">
              <Link className="w-25 ms-2 btn btn-info" to={`/admin/tour/get/operater/${data._id}`}>
                Show Agencie
              </Link>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
    <div className="mt-5 d-flex justify-content-center text-center">
        <div className="text-center">
          <div
            className="comment-box "
            style={{ maxHeight: "320px", overflowY: "auto", alignItems:"center"}} // Adjusted maxHeight value
          >
            {data.reviews.length > 0 &&
              data.reviews.map((review) => (
                <div key={review._id} className="">
                  <div className="bg-info px-2 my-2 pb-1 comment-detalis">
                    <p className="fs-5 m-auto text-center px-3">
                      {Array.from({
                        length: review.rating,
                      }).map((_, starIndex) => (
                        <FontAwesomeIcon
                          key={starIndex}
                          icon={faStar}
                          className="text-warning"
                        />
                      ))}
                    </p>
                    <div className="bg-white px-3 comment-details">
                      <p>{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
