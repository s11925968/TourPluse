import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../shared/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import './GetOperater.css';

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
                      to={`/company/${dataOperator._id}/review`}
                      className="btn btn-info me-3"
                    >
                      Create Review
                    </Link>
                    <Link
                      to={`/tour/get/${dataOperator._id}`}
                      className="btn btn-info"
                    >
                      Show Tours
                    </Link>
                  </div>
                </h5>
              
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
