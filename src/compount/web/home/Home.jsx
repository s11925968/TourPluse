// import React from "react";
// import "./Home.css";
// import { Link } from "react-router-dom";
// import {
//   faBehance,
//   faDribbble,
//   faFacebook,
//   faGoogle,
//   faLinkedinIn,
// } from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowRight,
//   faEnvelope,
//   faHouse,
//   faLocationDot,
//   faPhone,
// } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import { useQuery } from "react-query";
// import Loader from "../../shared/Loader";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import "./Home.css";
// export default function Home() {
//   const getOperator = async () => {
//     const { data } = await axios.get(
//       `${import.meta.env.VITE_URL_LINK}/operator/getActive`
//     );
//     return data.tourOperator;
//   };
//   const { data, isLoading } = useQuery("Get_Operator", getOperator);
//   console.log(data);
//   if (isLoading) {
//     return <Loader />;
//   }
//   return (
//     <section id="about">
//       <header className="header">
//         <div className="info-header">
//           <div className="info-home text-center">
//             <div className="d-flex d-flex justify-content-center align-items-center">
//               <p>Welcome to Tourpulse</p>
//             </div>
//             <span>
//               All Palestinian Trips offers
//               <br />
//               ,in the palm of your hand
//             </span>
//             <div className="icons">
//               <FontAwesomeIcon icon={faFacebook} className="brand brand-face" />
//               <FontAwesomeIcon
//                 icon={faLinkedinIn}
//                 className="brand brand-linked"
//               />
//               <FontAwesomeIcon icon={faGoogle} className="brand brand-google" />
//             </div>
//           </div>
//         </div>
//       </header>
//       <div className="operator">
//         <div className="container d-flex justify-content-start align-items-center ">
//           <Swiper
//             modules={[Navigation, Pagination, Autoplay]}
//             spaceBetween={50}
//             navigation
//             loop={true}
//             autoplay={{
//               delay: 3000,
//             }}
//             pagination={{
//               clickable: true,
//             }}
//             breakpoints={{
//               // when window width is >= 600px
//               600: {
//                 slidesPerView: 1,
//               },
//               // when window width is >= 768px
//               768: {
//                 slidesPerView: 2,
//               },
//               // when window width is >= 1024px
//               1024: {
//                 slidesPerView: 2,
//               },
//             }}
//           >
//             <h2>All Agencies</h2>
//             {data?.length
//               ? data?.map((tourOperator) => (
//                   <SwiperSlide key={tourOperator._id}>
//                     <div className="info-content-operator">
//                       <div className="operator-image my-5">
//                         <img
//                           src={tourOperator.image.secure_url}
//                           className=""
//                           alt={`Operator ${tourOperator._id}`}
//                         />
//                       </div>
//                       <div className="text-info text-center pt-3">
//                         <div className="name-company">
//                           <h2 className="fs-5 ">
//                             {tourOperator.name}
//                           </h2>
//                         </div>
//                         <h2 className="fs-5">
//                           <span className="text-white pe-2">FounderName:</span>
//                           {tourOperator.founderName}
//                         </h2>
//                         <h2 className="fs-5">
//                           <span className="text-white pe-2">Address:</span>
//                           {tourOperator.address}
//                         </h2>
//                         <h2 className="fs-5">
//                           <span className="text-white pe-2">PhoneNumber:</span>
//                           {tourOperator.phoneNumber}
//                         </h2>
//                         <p className="fs-5 text-white">
//                           <span className="text-white px-2">Description:</span>
//                           {tourOperator.description}
//                         </p>
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))
//               : "no data available"}
//           </Swiper>
//         </div>
//       </div>
     
//     </section>
//   );
// }


// ... (previous imports)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../shared/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faBehance, faDribbble, faFacebook, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Home.css';
import { Link } from 'react-router-dom';
export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getOperator = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_URL_LINK}/operator/getActive`);
      setData(data.tourOperator);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOperatorClick = (operatorId) => {
    const clickedOperator = data.find((operator) => operator._id === operatorId);
    setSelectedOperator(clickedOperator);
  };
  useEffect(() => {
    getOperator();
  }, [current]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    
    <section id="about">
      <header className="header">
        <div className="info-header">
          <div className="info-home text-center">
            <div className="d-flex d-flex justify-content-center align-items-center">
              <p>Welcome to Tourpulse</p>
            </div>
            <span>All Palestinian Trips offers,<br/> in the palm of your hand</span>
            <div className="icons">
              <FontAwesomeIcon icon={faFacebook} className="brand brand-face" />
              <FontAwesomeIcon icon={faLinkedinIn} className="brand brand-linked" />
              <FontAwesomeIcon icon={faGoogle} className="brand brand-google" />
            </div>
          </div>
        </div>
      </header>
      <section className="category-serives container pt-5">
        <div className="info-category">
          <h2>SERIVES</h2>
          <p>We Offer Best Services</p>
        </div>
        <div className="services my-5">
          <div className="row">
            <div className="col-md-3 services-image">
              <img src="/img/serives/castle.png" />

              <h4 className="py-3">Guided Tours</h4>
              <p>
                sunt qui repellat saepe quo velit aperiam id aliquam placeat.
              </p>
            </div>
            <div className="col-md-3 services-image">
              <img src="/img/serives/plane.png" />
              <h4 className="py-3">Best Flights Options</h4>
              <p>
                sunt qui repellat saepe quo velit aperiam id aliquam placeat.
              </p>
            </div>
            <div className="col-md-3 services-image">
              <img src="/img/serives/reception.png" />
              <h4 className="py-3">Religious Tours</h4>
              <p>
                sunt qui repellat saepe quo velit aperiam id aliquam placeat.
              </p>
            </div>
            <div className="col-md-3 services-image">
              <img src="/img/serives/route.png" />

              <h4 className="py-3">Medical insurance</h4>
              <p>
                sunt qui repellat saepe quo velit aperiam id aliquam placeat.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="category-phone category-serives container pt-5">
        <div className="info-category">
          <h2>CATEGORY</h2>
          <p>All Agencies</p>
        </div>
        <div className="services my-5">
          <div className="row">
            {selectedCategory ? (
              <div className="col-md-12">
                <h2>{selectedCategory}</h2>
                <h2>details</h2>
              </div>
            ) : (
              data?.map((tourOperator) => (
                <div className="col-md-3 services-image" key={tourOperator.name}>
                  <img
                    src={tourOperator.image.secure_url}
                    alt={`Operator ${tourOperator._id}`}
                  />
                  <h4 className="py-3">{tourOperator.name}</h4>
                  <p>{tourOperator.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <div className="operator">
        <div className="container d-flex justify-content-start align-items-center ">
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
              600: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
          >
            <h2>All Agencies</h2>
            {data?.length ? (
              data.map((tourOperator) => (
                <SwiperSlide key={tourOperator._id}>
                  <div className="info-content-operator" onClick={() => handleOperatorClick(tourOperator._id)}>
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
                </SwiperSlide>
              ))
            ) : (
              'no data available'
            )}
          </Swiper>
        </div>
      </div>
      <section className="about-us container">
        <div className="row info-images">
          <h2>About us</h2>
          <div className="col-md-6 about-info">
            <p>
              Tour Pulse acts as an intermediary between travel agencies and
              travelers, allowing agencies to display their trips and offers and
              provide travelers with a range of trips, so it provides
              advertising for the agencies and providing a large selection of
              trips for travelers.
              <Link to="/about">
                Read more about TOURPLUSE
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </p>
          </div>
          <div className="col-md-6 image-about">
            {/* <img src="/images/info-images.jpg" alt="image-abour-us" /> */}
            <img src="/images/info-images.jpg" />
          </div>
        </div>
      </section>
      <section className="map position-relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27002.02680188146!2d35.22707967947037!3d32.22434418493328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ce0f650425697%3A0x7f0ba930bd153d84!2sNablus!5e0!3m2!1sen!2s!4v1701524940071!5m2!1sen!2s"
          width="100%"
          height={650}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="info-map position-absolute bottom-0 w-100">
          <div className="container text-white rounded-top-3 p-3 py-4">
            <div className="row d-flex">
              <div className="col-lg-4 d-flex  justify-content-center">
                <div className="info d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="solid fs-4 d-flex justify-content-center align-items-center main-color pe-2"
                  />
                  <span>
                    Contact Number <br />
                    +972 595597630
                  </span>
                </div>
              </div>
              <div className="col-lg-4 d-flex  justify-content-center">
                <div className="info d-flex align-items-center text-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="solid fs-4 d-flex justify-content-center align-items-center main-color pe-2"
                  />
                  <spam>
                    Email Address
                    <br />
                    tourplusecompany@gmail.com
                  </spam>
                </div>
              </div>
              <div className="col-lg-4 d-flex  justify-content-center">
                <div className="info d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="solid fs-4 d-flex justify-content-center align-items-center main-color pe-2"
                  />
                  <span className="">
                    Location
                    <br />
                    nablues
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
