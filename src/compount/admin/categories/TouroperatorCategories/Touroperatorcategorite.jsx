import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../shared/Loader.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y,Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './TouroperatorCategories.css';

export default function Touroperatorcategorite() {
  const { _id } = useParams();

  const getTourOperators = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.get(`${import.meta.env.VITE_URL_LINK}/categories/allTourOperator/${_id}`, {
        headers: {
          Authorization: `ghazal__${token}`,
        },
      });
      return data.tourOperator;
    } catch (error) {
      console.error('Error fetching tour operator data:', error);
      throw error;
    }
  };

  const { data, isLoading } = useQuery('gettouroperator', getTourOperators);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="catagories container d-flex justify-content-start align-items-center ">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          navigation
          loop={true}
          autoplay={{
            delay: 3000,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            // when window width is >= 600px
            600: {
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 1,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 2,
            },
          }}
        >
          {data?.length
            ? data?.map((tourOperator) => (
                <SwiperSlide key={tourOperator._id}>
                  <div className="info-content">
                    <div className="operator-image">
                      <img src={tourOperator.image.secure_url} className="rounded-circle " alt={`Operator ${tourOperator._id}`} />
                    </div>
                    <div className="text-info text-center pt-3">
                      <h2 className="fs-5">
                        <span className="text-danger pe-2">Address:</span>
                        {tourOperator.address}
                      </h2>
                      <h2 className="fs-5">
                        <span className="text-danger pe-2">PhoneNumber:</span>
                        {tourOperator.phoneNumber}
                      </h2>
                      <p className="fs-5 ">
                        <span className="text-danger pe-2">Description:</span>
                        {tourOperator.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : 'no data available'}
        </Swiper>
      </div>
    </div>
  );
}
