import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Loader from "../../shared/Loader";
import './Getoperator.css';

import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Home({ users }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getCategories = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.get(`${import.meta.env.VITE_URL_LINK}/tour/get?isDeleted=true&limit=200`, {
        headers: {
          Authorization: `ghazal__${token}`
        },
      });
      setData(data.tour);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setIsLoading(false);
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleProductClick = (productId) => {
    const clickedProduct = data.find((tour) => tour._id === productId);

    // Toggle selectedProduct state to show/hide details
    setSelectedProduct((prevProduct) =>
      prevProduct && prevProduct._id === clickedProduct._id ? null : clickedProduct
    );
  };

  const filteredTours = data ? data.filter((tour) => tour.isDeleted === true) : [];
  const showNavigation = filteredTours.length > 0;

  const renderPrevButton = () => {
    if (!showNavigation) return null;

    return (
      <Swiper.Navigation.Prev />
    );
  };

  const renderNextButton = () => {
    if (!showNavigation) return null;

    return (
      <Swiper.Navigation.Next />
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="category-serives pt-5">
      <div className="info-Deleted ms-5">
        <h2>Deleted Tours</h2>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={4.3}
        navigation={{
          prevEl: renderPrevButton,
          nextEl: renderNextButton
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
      >
        {filteredTours.length > 0 ? (
          filteredTours.map((tour) => (
            <SwiperSlide key={tour._id} className="col-lg-3 mb-4">
              <div className='images-tour-admin'>
                <img src={tour.image.secure_url} className="w-100" alt={tour.name} />
              </div>
              <div className='text-center'>
                <h4 className="text-center text-black">
                  {tour.name
                    .split(" ")
                    .slice(0, 5)
                    .join(" ")}
                </h4>
                <Link to="#" className="info-tour btn btn-primary " onClick={() => handleProductClick(tour._id)}>
                  Details
                </Link>
                <Link to={`/admin/tour/forceDelete/${tour._id}`} className="info-tour btn btn-primary ms-2">
                  Force Delete
                </Link>
                <Link to={`/admin/tour/restore/${tour._id}`} className='info-tour btn btn-primary ms-2'>Restore Tour</Link>

                {selectedProduct && selectedProduct._id === tour._id && (
                  <div>
                    <p>Price: ${tour.price}</p>
                    <p>Start Date: {new Date(tour.startDate).toLocaleDateString()}</p>
                    <p>End Date: {new Date(tour.endDate).toLocaleDateString()}</p>
                    <p>
                      {tour.discount
                        ? "discount: " + tour.discount
                        : null}
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
                      {tour.location
                        ? "location: " + tour.location
                        : null}
                    </p>
                    <p>
                      {tour.meals
                        ? "Meals: " + tour.meals
                        : null}
                    </p>
                    <p>
                      {tour.note
                        ? "Note: " + tour.note
                        : null}
                    </p>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>No data available</p>
        )}
      </Swiper>
    </section>
  );
}
