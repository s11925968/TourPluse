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
      console.log(data);
      setDataOperator(data.operator);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className=''>
            {selectedCategory ? (
              <div className="text-center">
              <h2>{selectedCategory.name}</h2>
              <p>{selectedCategory.description}</p>
              <p>{selectedCategory.address}</p>
              <p>{selectedCategory.email}</p>
              <p>{selectedCategory.phoneNumber}</p>
              <p>{selectedCategory.founderName}</p>
              <div className="d-flex justify-content-center align-items-center">
                <div>
                    <Link
                      to={`/admin/operator/UpdateOperator/${selectedCategory._id}`}
                      className="btn btn-info me-4"
                    >
                      Update Agency
                    </Link>
                      <Link
                        to={`/admin/tour/get/${selectedCategory._id}`}
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
                Back to Agencie
              </button>
            </div>
            
            ) : (
              <>
                {dataOperator && (
                  <>
                    <div className="services-Tour text-center my-3" onClick={() => handleCategoryClick(dataOperator)}>
                      <img
                        src={dataOperator.image.secure_url}
                        alt={`Operator ${dataOperator._id}`}
                        className=""
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
                        {dataOperator.name.split(" ").slice(0, 3).join(" ")}...
                      </h5>
                      <Link to="#" className="btn btn-info">
                        Show Details
                      </Link>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
    </div>
  );
}
