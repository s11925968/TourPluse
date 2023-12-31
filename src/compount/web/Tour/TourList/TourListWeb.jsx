import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../../shared/Loader.jsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./Tourlist.css";

export default function TourlistWeb() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [current, setCurrent] = useState(1);
  const [title, setTitle] = useState(null);
  const [tourStates, setTourStates] = useState({});
  const [dataTour, setDataTour] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTours = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      params.append("page", current);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_URL_LINK
        }/tour/getActive?${params.toString()}&limit=24`
      );
      setTitle(data.title);
      setDataTour(data.tour);
      setTourStates(
        Object.fromEntries(data.tour.map((tour) => [tour._id, false]))
      );
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching tour data:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    const clickedProduct = dataTour.find((tour) => tour._id === productId);
    setSelectedProduct((prevProduct) =>
      prevProduct && prevProduct._id === clickedProduct._id
        ? null
        : clickedProduct
    );
  };

  const handleShowCommentsClick = (tourId) => {
    setTourStates((prevStates) => ({
      ...prevStates,
      [tourId]: !prevStates[tourId],
    }));
  };

  const handlePageClick = (pageNumber) => {
    setCurrent(pageNumber + 1);
    setSelectedProduct(null);
  };

  const calculateAvgRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round(totalRating / reviews.length);
  };

  useEffect(() => {
    getTours();
  }, [current]);
  console.log(dataTour);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="tourlist-web container">
      <div className="row">
        {dataTour.length ? (
          <>
            {dataTour.map((tour) => (
              <div key={tour._id} className="col-lg-4 mb-4">
                <div className="image">
                  <img src={tour.image.secure_url} alt={tour.name} />
                </div>
                <div className="text-center">
                  
                  <h3>{tour.name.split(" ").slice(0, 4).join(" ")}...</h3>
                  <p>Price: ${tour.price}</p>
                  <p>
                    Start Date: {new Date(tour.startDate).toLocaleDateString()}
                  </p>
                  <p>End Date: {new Date(tour.endDate).toLocaleDateString()}</p>
                  <p className="py-3">
                    {Array.from({
                      length: calculateAvgRating(tour.reviews),
                    }).map((_, starIndex) => (
                      <FontAwesomeIcon
                        key={starIndex}
                        icon={faStar}
                        className="text-warning"
                      />
                    ))}
                  </p>
                  {/* <button
                    className="btn btn-info me-3"
                    onClick={() => handleShowCommentsClick(tour._id)}
                  >
                    {tourStates[tour._id] ? "Hide Comments" : "Show Comments"}
                  </button> */}
                  <Link
                    to={`/tour/details/${tour._id}`}
                    className="btn btn-primary"
                    onClick={() => handleProductClick(tour._id)}
                  >
                    Details
                  </Link>
                  {/* {selectedProduct && selectedProduct._id === tour._id && (
                    <div>
                      {tourStates[tour._id] && (
                        <div>
                          {selectedProduct.reviews.map((review, index) => (
                            <div key={review._id}>
                              <h6>Comment {index + 1}</h6>
                              <h6>{review.comment}</h6>
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
                      <p>
                        {tour.discount ? "discount: " + tour.discount : null}
                      </p>
                      <p>
                        {tour.description
                          ? "description: " + tour.description
                          : null}
                      </p>
                      <p>
                        {tour.finalPrice
                          ? "Final Price: " + tour.finalPrice
                          : null}
                      </p>
                      <p>
                        {tour.location ? "location: " + tour.location : null}
                      </p>
                      <p>{tour.meals ? "Meals: " + tour.meals : null}</p>
                      <p>{tour.note ? "Note: " + tour.note : null}</p>
                      <Link
                        to={`/tour/${tour._id}/review`}
                        className="text-danger"
                      >
                        Create Review
                      </Link>
                    </div>
                  )} */}
                </div>
              </div>
            ))}
            <div className="col-12">
              <nav aria-label="Page navigation example">
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
                  {Array.from({ length: Math.ceil(title / 24) || 0 }).map(
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
            </div>
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}
