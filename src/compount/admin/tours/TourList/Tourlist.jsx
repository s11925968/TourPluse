import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Loader from '../../../shared/Loader.jsx';
import { Navigation, Pagination,Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
// ... (your imports)

// ... (your imports)

export default function Tourlist() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getcategories = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.get(`${import.meta.env.VITE_URL_LINK}/tour/get`, {
        headers: {
          Authorization: `ghazal__${token}`
        },
      });
      return data.tour;
    } catch (error) {
      console.error('Error fetching admin data:', error);
      throw error;
    }
  }

  const { data, isLoading } = useQuery("getcategories", getcategories);
  const handleProductClick = (productId) => {
    const clickedProduct = data.find((tour) => tour._id === productId);

    // Toggle selectedProduct state to show/hide details
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
