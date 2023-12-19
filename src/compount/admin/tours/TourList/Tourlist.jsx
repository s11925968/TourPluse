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
      <div className=" tourList row">
        {data.length
          ? data.map((tour) => (
              <div
                className="col-lg-4"
                key={tour._id}
                onClick={() => handleProductClick(tour._id)}
              >
                <div>
                  <img
                    src={tour.image.secure_url}
                    className="w-50"
                    alt={tour.name}
                  />
                </div>
                <div>
                  <Link to="#" className="btn btn-primary w-50">
                    Details
                  </Link>
                  {selectedProduct && selectedProduct._id === tour._id && (
                    <div>
                      <p>{tour.description}</p>
                      <p>Price: ${tour.price}</p>
                      {/* Add other product details as needed */}
                    </div>
                  )}
                </div>
              </div>
            ))
          : "no data available"}
      </div>
    </div>
  );
}
