import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../shared/Loader.jsx'
import { Navigation, Pagination, Scrollbar, A11y,Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './CategoriestourOperator.css'
export default function Touroperatorcategorite() {
  const {_id}=useParams();
  const getTourOperators=async()=>{
    try {
      const token=localStorage.getItem('userToken');
      const { data } = await axios.get(`${import.meta.env.VITE_URL_LINK}/categories/tourOperator/${_id}?limit=6`, {
        headers: {
          Authorization: `ghazal__${token}`
        },
      });
      return data;
    } catch (error) {
      console.error('Error fetching admin data:', error);
      throw error;
    }
  }
  const {data,isLoading}=useQuery('gettouroperator',getTourOperators);
  console.log(data);
  if(isLoading){
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
            900: {
              slidesPerView: 1,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 2,
            },
          }}
        >
          {data.tourOperator?.length
            ? data.tourOperator?.map((catagourie) => (
                <SwiperSlide key={catagourie._id}>
                  <div className='info-content'>
                    <div className='operator-image'>
                      <img src={catagourie.image.secure_url} className="rounded-circle"/>
                    </div>
                    <div className="text-info text-center pt-3">
                    <h2 className="fs-5"><span className='text-danger pe-2'>Address:</span>{catagourie.address}</h2>
                      <h2 className="fs-5"><span className='text-danger pe-2'>PhoneNumber:</span>{catagourie.phoneNumber}</h2>
                      <p className="fs-5 "><span className='text-danger pe-2'>Description:</span>{catagourie.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : "no data available"}
        </Swiper>
      </div>
    </div>
  );
}
