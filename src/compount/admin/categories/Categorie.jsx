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
      const { data } = await axios.get(`${import.meta.env.VITE_URL_LINK}/categories/get`, {
        headers: {
          Authorization: 'ghazal__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWYwYzIyOGEzODE1MGU3NDA5YTk3YiIsInN0YXR1cyI6IkFjdGl2ZSIsInJvbGUiOiJTdXBlcmFkbWluIiwiaWF0IjoxNzAxMzM5MjYyfQ.258XoriDX6D_g5UJ_-9FNTIup20siAjH1Vv2WJeRnoQ'
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
          slidesPerView={3}
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
          {data?.length
            ? data?.map((catagourie ,index) => (
                <SwiperSlide className="imgaes-catagourie" key={catagourie._id}>
                  {/* <Link to={`/categories/tourOperator/${catagourie._id}`}> */}
                  <Link to={`/admin/categories/allTourOperator/${catagourie._id}`}>
                  <div className="d-flex justify-content-center">
                    <img src={catagourie.image.secure_url} className="w-50" />
                  </div>
                  <div className="text-center pt-3">
                    <h1>#{index}</h1>
                    <h2 className="fs-5 ps-4">{catagourie.name}</h2>
                    <Link to={`/admin/updata/categories/${catagourie._id}`}>Update</Link>

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
