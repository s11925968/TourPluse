import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Navigation, Pagination,Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Loader from '../../../shared/Loader.jsx'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
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
    <div>
      <div className="catagories container d-flex justify-content-start align-items-center">
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
          {data?.categories.length
          ? data?.categories.map((catagourie,index) => (
                <SwiperSlide  key={catagourie._id}>
                  <Link to={`/dashboard/createTours/${catagourie._id}`} className='text-decoration-none'>
                  <div className="d-flex justify-content-center">
                    <img src={catagourie.image.secure_url} className="w-100" />
                  </div>
                  <div className="text-center pt-3">
                    <h2 className="fs-5">{catagourie.name}</h2>
                  </div>
                  </Link>
                </SwiperSlide>
              ))
            : "no data available"}
        </Swiper>
      </div>
    </div>
  );
}




