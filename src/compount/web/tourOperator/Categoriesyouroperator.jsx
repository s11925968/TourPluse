import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./CategoriestourOperator.css";

import Loader from "../../shared/Loader";

export default function Home() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [current, setCurrent] = useState(1);
  const [title, setTitle] = useState(null);
  const [dataOperater, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showComments, setShowComments] = useState(false); // Add showComments state
  const { _id } = useParams();

  const getOperator = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("userToken");
      const params = new URLSearchParams();
      params.append("page", current);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_URL_LINK
        }/categories/tourOperator/${_id}?${params.toString()}&limit=8`,
        {
          headers: {
            Authorization: `ghazal__${token}`,
          },
        }
      );
      setTitle(data.title);
      setData(data.tourOperator);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOperatorClick = (operatorId) => {
    const clickedOperator = dataOperater.find(
      (operator) => operator._id === operatorId
    );
    setSelectedOperator(clickedOperator);
  };
  console.log(dataOperater);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handlePageClick = (pageNumber) => {
    setCurrent(pageNumber + 1);
    setSelectedCategory(null);
  };
  const calculateAvgRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round(totalRating / reviews.length);
  };
  useEffect(() => {
    getOperator();
  }, [current]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="category-serives container pt-5">
      <div className="info-category">
        <h2>AGENCIES</h2>
      </div>
      <div className="services my-5">
        <div className="row">
          {selectedCategory ? (
            <div className="col-md-12 text-center">
              <h2>{selectedCategory.name}</h2>
              <p>{selectedCategory.description}</p>
              <p>{selectedCategory.address}</p>
              <p>{selectedCategory.email}</p>
              <p>{selectedCategory.phoneNumber}</p>
              <p>{selectedCategory.founderName}</p>
              <div className="d-flex justify-content-center align-items-center">
                <div>
                  <Link
                    to={`/company/${selectedCategory._id}/review`}
                    className="btn btn-info me-3"
                  >
                    Create Review
                  </Link>
                  <button
                    className="btn btn-info me-3"
                    onClick={() => setShowComments(!showComments)}
                  >
                    {showComments ? "Hide Comments" : "Show Comments"}
                  </button>
                  <Link
                    to={`/tour/get/${selectedCategory._id}`}
                    className="btn btn-info"
                  >
                    Show Tours
                  </Link>
                </div>
              </div>
              {showComments && (
                <div>
                  {selectedCategory.rev.map((review, index) => (
                    <div key={review._id}>
                      <h1>Comment {index + 1}</h1>
                      <h2>{review.comment}</h2>
                      {Array.from({ length: review.rating }).map(
                        (_, starIndex) => (
                          <FontAwesomeIcon
                            key={starIndex}
                            icon={faStar}
                            className="text-warning"
                          />
                        )
                      )}
                    </div>
                  ))}
                </div>
              )}
              <button
                className="btn btn-info mt-3"
                onClick={() => setSelectedCategory(null)}
              >
                Back to Categories
              </button>
            </div>
          ) : (
            <>
              {dataOperater?.map((tourOperator, index) => {
                const operatorAvgRating = calculateAvgRating(tourOperator.rev);
                return (
                  <div
                    className="col-lg-3 services-image text-center my-3"
                    key={tourOperator.name}
                    onClick={() => handleCategoryClick(tourOperator)}
                  >
                    <img
                      src={tourOperator.image.secure_url}
                      alt={`Operator ${tourOperator._id}`}
                      className=""
                    />
                    <p className="py-3">
                      {Array.from({ length: operatorAvgRating }).map(
                        (_, starIndex) => (
                          <FontAwesomeIcon
                            key={starIndex}
                            icon={faStar}
                            className="text-warning"
                          />
                        )
                      )}
                    </p>
                    <h5>{tourOperator.name.split(" ").slice(0, 3).join(" ")}...</h5>
                    <Link to="#" className="btn btn-info">
                        Show Details
                    </Link>
                  </div>
                );
              })}
              <nav aria-label="Page navigation example ">
                <ul className="pagination justify-content-center my-5">
                  <li
                    className={`z-1 page-item ${
                      current === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageClick(current - 2)}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: Math.ceil(title / 8) || 0 }).map(
                    (_, pageIndex) => (
                      <li
                        key={pageIndex}
                        className={`z-1 page-item ${
                          current === pageIndex + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageClick(pageIndex)}
                        >
                          {pageIndex + 1}
                        </button>
                      </li>
                    )
                  )}
                  <li
                    className={`z-1 page-item ${
                      current === Math.ceil(title / 8) ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageClick(current)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
