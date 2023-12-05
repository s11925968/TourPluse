import React from 'react'
import './CategoriestourOperator.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../../shared/Loader';
import { Navigation, Pagination, Scrollbar, A11y,Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function Categoriesyouroperator() {
  const {_id}=useParams();
  const getCatagoriesTourOperator =async()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_URL_LINK}/categories/tourOperator/${_id}`);
    return data.tourOperator;
  }
  const {data,isLoading}=useQuery('get_catagories_tour_operators',getCatagoriesTourOperator);
  if(isLoading){
    return <Loader/>
  }
  return (
    
    <div>
    <div className="catagories d-flex justify-content-start align-items-center">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        pagination={{
          clickable: true,
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
          {data.length? data.map((tour)=> (
              <SwiperSlide className="imgaes-catagourie" key={tour._id}>
                {/* <Link to={`/categories/tourOperator/${catagourie._id}`}> */}
                <div className="d-flex justify-content-center">
                  <img src={tour.image.secure_url} className="" />
                </div>
                <div className="text-center pt-3">
                  <h2 className="fs-5">{tour.name}</h2>

                </div>
              </SwiperSlide>
            ))
          : "no data available"}
      </Swiper>
    </div>
  </div>
  );
}
