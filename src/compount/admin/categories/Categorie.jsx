import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import Loader from '../../shared/Loader';
import { Navigation, Pagination, Scrollbar, A11y,Autoplay} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './style.css'
// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
export default function Categorie() {
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
          {data?.length
            ? data?.map((catagourie ,index) => (
                <SwiperSlide  key={catagourie._id}>
                  {/* <Link to={`/categories/tourOperator/${catagourie._id}`}> */}
                  <Link to={`/admin/categories/allTourOperator/${catagourie._id}`} className='text-decoration-none'>
                  <div className="d-flex justify-content-center">
                    <img src={catagourie.image.secure_url} className="w-100" />
                  </div>
                  <div className="text-center pt-3">
                    <h2 className="fs-5 ps-4">{catagourie.name}</h2>
                    <Link to={`/admin/updata/categories/${catagourie._id}`} className='btn btn-primary' >Update</Link>

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
