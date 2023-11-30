import React from 'react'
import './catagories.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Navigation, Pagination, Scrollbar, A11y,Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Loader from '../../shared/Loader.jsx'
// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function Catagouries() {
  const getCatagories =async()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_URL_LINK}/categories/active`)
    return data;
  }

  const {data,isLoading}=useQuery('get_catagories',getCatagories);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="catagories container d-flex justify-content-start align-items-center">
      <Swiper
        modules={[Navigation, Pagination,Autoplay]}
        spaceBetween={50}
        slidesPerView={2.1}
        navigation
        loop={true}
        autoplay= {{
          delay: 3000,
        }}
        pagination={{ 
          clickable: true,
          }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data?.categories.length
          ? data?.categories.map((catagourie) => (
              <SwiperSlide className="imgaes-catagourie" key={catagourie._id}>
                <img src={catagourie.image.secure_url} />
                <h2 className='fs-5 d-flex ps-4'>{catagourie.name}</h2>
              </SwiperSlide>
            ))
          : "no data available"}
      </Swiper>
    </div>
  );
}
