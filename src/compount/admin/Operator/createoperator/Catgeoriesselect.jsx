import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import Loader from '../../../shared/Loader.jsx';
import { Navigation, Pagination, Scrollbar, A11y,Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
export default function Catgeoriesselect() {
  const getcategories=async()=>{
    try {
      const token=localStorage.getItem('userToken');
      const { data } = await axios.get(`${import.meta.env.VITE_URL_LINK}/categories/get`, {
        headers: {
          Authorization: `ghazal__${token}`
        },
      });
      return data.categories;
    } catch (error) {
      console.error('Error fetching admin data:', error);
      throw error;
    }
  }
  const {data,isLoading}=useQuery("getcategories",getcategories);
  if(isLoading){
    return <Loader />;
  }
  return (
    <div>
    <p className='text-center mt-2 fs-3 text-danger'>Please choose your company category</p>
    <div className="categories-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          600: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 1.2,
          },
          1024: {
            slidesPerView: 2.2,
          },
        }}
      >
        {data?.length ? (
          data?.map((category, index) => (
            <SwiperSlide key={category._id}>
              <Link to={`/admin/operator/create/${category._id}`} className='text-decoration-none'>
                <div className="category-slide">
                  <img src={category.image.secure_url} className="w-100" alt={`Category ${index}`} />
                  <div className="text-center pt-3">
                    <h2 className="fs-5">{category.name}</h2>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <p>No data available</p>
        )}
      </Swiper>
    </div>
  </div>
  );
}
