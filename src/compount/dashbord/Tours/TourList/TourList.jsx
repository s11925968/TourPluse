import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loader from '../../../shared/Loader.jsx';
import { Link } from 'react-router-dom';

export default function Tourlist() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_URL_LINK}/tour/getActive`);
      return data.tour;
    } catch (error) {
      console.error('Error fetching tour data:', error);
      throw error;
    }
  };

  const { data, isLoading } = useQuery('getcategories', getCategories);

  const handleProductClick = (productId) => {
    const clickedProduct = data.find((tour) => tour._id === productId);
    setSelectedProduct((prevProduct) =>
      prevProduct && prevProduct._id === clickedProduct._id ? null : clickedProduct
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="row">
        {data.length ? (
          data.map((tour) => (
            <div key={tour._id} className="col-lg-4 mb-4">
              <div>
                <img src={tour.image.secure_url} className="w-100" alt={tour.name} />
              </div>
              <div className='text-center'>
                <h3>{tour.name}</h3>
                <p>Price: ${tour.price}</p>
                <p>Start Date: {new Date(tour.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(tour.endDate).toLocaleDateString()}</p>
                <Link to="#" className="btn btn-primary" onClick={() => handleProductClick(tour._id)}>
                  Details
                </Link>
                {selectedProduct && selectedProduct._id === tour._id && (
                  <div>
                    <p>Tour: {tour.discount}</p>
                    <p>{tour.description}</p>
                    <p>Final Price: {tour.finalPrice}</p>
                    <p>Location: {tour.location}</p>
                    <p>Meals: {tour.meals}</p>
                    <p>Note: {tour.note}</p>
                    <Link className='btn btn-info' to={`/dashboard/tour/forceDelete/${tour._id}`}>Delete Tour</Link>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}
