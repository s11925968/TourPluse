import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Getoperator.css";
import Loader from "../../shared/Loader";

export default function Home() {
  const getOperator = async () => {
    const token = localStorage.getItem("userToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_URL_LINK}/operator/get`,
      {
        headers: {
          Authorization: `ghazal__${token}`,
        },
      }
    );
    return data.tourOperator;
  };

  const { data, isLoading } = useQuery("getOperator", getOperator);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="operator">
      <div className="container d-flex justify-content-start align-items-center ">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          navigation
          loop={true}
          autoplay={{
            delay: 5000,
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
              slidesPerView: 2,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 2,
            },
          }}
        >
          <h2>All Agencies</h2>
          {data?.length
            ? data?.map((tourOperator) => (
                <SwiperSlide key={tourOperator._id}>
                  <Link to={`/admin/tour/get/${tourOperator._id}`} className="text-decoration-none">
                    <div className="info-content-operator">
                      <div className="operator-image my-5">
                        <img
                          src={tourOperator.image.secure_url}
                          className=""
                          alt={`Operator ${tourOperator._id}`}
                        />
                      </div>
                      <div className="text-info text-center pt-3">
                        <div className="name-company">
                          <h2 className="fs-5 ">{tourOperator.name}</h2>
                        </div>
                        <h2 className="fs-5">
                          <span className="text-white pe-2">FounderName:</span>
                          {tourOperator.founderName}
                        </h2>
                        <h2 className="fs-5">
                          <span className="text-white pe-2">Address:</span>
                          {tourOperator.address}
                        </h2>
                        <h2 className="fs-5">
                          <span className="text-white pe-2">PhoneNumber:</span>
                          {tourOperator.phoneNumber}
                        </h2>
                        <p className="fs-5 text-white">
                          <span className="text-white px-2">Description:</span>
                          {tourOperator.description}
                        </p>
                      </div>
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
