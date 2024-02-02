import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../shared/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

export default function GetOperator() {
  const { _id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [dataOperator, setDataOperator] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const getTours = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_LINK}/tour/get/company/${_id}`
      );
      setDataOperator(data.operator);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(dataOperator);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    getTours();
  }, [_id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="servies-tours">
        <div>
          {dataOperator && (
            <>
              <div className="services-Tour text-center my-1"
                onClick={() => handleCategoryClick(dataOperator)}>
                <img
                  src={dataOperator.image.secure_url}
                  alt={`Operator ${dataOperator._id}`}
                  className="w-25"
                />
                <p className="py-3">
                  {[...Array(Math.floor(dataOperator.averageRating))].map((_, starIndex) => (
                    <FontAwesomeIcon
                      key={starIndex}
                      icon={faStar}
                      className="text-warning"
                    />
                  ))}
                  {dataOperator.averageRating % 1 !== 0 && (
                    <FontAwesomeIcon
                      icon={faStarHalf}
                      className="text-warning"
                    />
                  )}
                </p>
                <h5>
                  <h2>{dataOperator.name}</h2>
                  <p>{dataOperator.description}</p>
                  <p>{dataOperator.address}</p>
                  <p>{dataOperator.email}</p>
                  <p>{dataOperator.phoneNumber}</p>
                  <p>{dataOperator.founderName}</p>
                  <div>
                    <Link
                      to={`/admin/tour/get/${dataOperator._id}`}
                      className="btn btn-info"
                    >
                      Show Tours
                    </Link>
                    <button
                      className="btn btn-info ms-3"
                      onClick={()=> setShowComments(!showComments)}
                    >
                      {showComments ? "Hide Comments" : "Show Comments"}
                    </button>
                  </div>
                </h5>
                {showComments && (
                  <div className="mt-5  d-flex justify-content-center text-center">
                  <div className="text-center">
                    <div
                      className="comment-box "
                      style={{ maxHeight: "320px", overflowY: "auto", alignItems:"center"}} // Adjusted maxHeight value
                    >
                      {selectedCategory.rev.length > 0 &&
                        selectedCategory.rev.map((rev) => (
                          <div key={rev._id} className="w-100 ">
                            <div className="bg-info px-2 my-2 pb-1 comment-detalis">
                              <p className="fs-5 m-auto text-center px-3">
                                {Array.from({
                                  length: rev.rating,
                                }).map((_, starIndex) => (
                                  <FontAwesomeIcon
                                    key={starIndex}
                                    icon={faStar}
                                    className="text-warning"
                                  />
                                ))}
                              </p>
                              <div className="bg-white px-3 comment-details">
                                <p>{rev.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
