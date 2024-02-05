import React from 'react'
import './about.css'
import { Link } from 'react-router-dom'
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function About() {
  return (
    <div className="">
      <section className="about-style about-us container">
        <div className="row ">
          <h2>About us</h2>
          <div className="col-md-8 about-info">
            <p >
              Tour Pulse acts as an intermediary between travel agencies and
              travelers, allowing agencies to display their trips and offers and
              provide travelers with a range of trips, so it provides
              advertising for the agencies and providing a large selection of
              trips for travelers.
            </p>
          </div>
          <div className="col-md-4 image-about">
            <img src="/images/icononly_transparent_nobuffer.png"/>
          </div>
        </div>
      </section>
      <section className="adventures">
        <div className="container rounded-2 px-2">
          <div className="pt-2 text-center">
            <div className="info-adven">
              <h2>Organized Adventures: What are they?</h2>
              <p>
                A multi-day travel experience seamlessly organized by a trusted
                operator—everything from logistics to meals to experiences to
                friendly guides. All you have to do is choose your adventure,
                pack your bags and go. Embark on a transformative organized
                adventure today. Choose from more than options via trusted
                operators on our platform.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="bg-white rounded-2">
                <p>
                  <img
                    src="/img/one-adv.jpg"
                    alt="Groub-Adventures"
                    className="img-fluid rounded-2"
                  />
                  <h3 className="fs-2 ps-2 pt-3 text-dark">Group Adventures</h3>
                  <p className="fs-3 ps-2 text-dark">
                    Join a group and forge lifelong friendships.
                  </p>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-white rounded-2">
                <p>
                  <img
                    src="/img/tow-adv.jpg"
                    alt="Private-Adventures"
                    className="img-fluid rounded-2 text-decoration-none"
                  />
                  <h3 className="fs-2 ps-2 pt-3 text-dark">
                    Private Adventures
                  </h3>
                  <p className="fs-3 ps-2 text-dark">
                    Travel exclusively with your own group.
                  </p>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-white rounded-2">
                <p>
                  <img
                    src="/img/tree-adv.jpg"
                    alt="Personalized-Adventures"
                    className="img-fluid rounded-2"
                  />
                  <h3 className="fs-2 ps-2 pt-3 text-dark">
                    Personalized Adventures
                  </h3>
                  <p className="fs-3 ps-2 text-dark">
                    Customize an existing itinerary, or create your own.
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="ACTIVITIES my-5">
        <div className="info-ACTIVITYS d-flex justify-content-center align-items-end m-0 py-3">
          <h2 className="m-0">TOP ACTIVITIES</h2>
        </div>
        <div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            loop={true}
            autoplay={{
              delay: 10000,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              600: {
                slidesPerView: 1.5,
              },
              900: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 2.3,
              },
            }}
          >
            <SwiperSlide>
              <div className="Activity-image w-100">
                <img src="/Top Activaty/felipe-giacometti-q80sx583gzE-unsplash.jpg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="Activity-image w-100">
                <img
                  src="/Top Activaty/amien-taryamin-IEcqd914qpw-unsplash.jpg"
                  className="img-fluid"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="Activity-image w-100">
                <img
                  src="/Top Activaty/kamil-pietrzak-AlA8S9tALAs-unsplash.jpg"
                  className="img-fluid"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="Activity-image w-100">
                <img
                  src="/Top Activaty/omer-f-arslan-W0FhhtnMd8k-unsplash.jpg"
                  className="img-fluid"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="Activity-image w-100">
                <img
                  src="/Top Activaty/rihards-sarma-JHeCuXiERFo-unsplash.jpg"
                  className="img-fluid"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="Activity-image w-100">
                <img
                  src="/Top Activaty/tommy-lisbin-2DH-qMX6M4E-unsplash.jpg"
                  className="img-fluid"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="Activity-image w-100">
                <img
                  src="/Top Activaty/toomas-tartes-Yizrl9N_eDA-unsplash.jpg"
                  className="img-fluid"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="Activity-image w-100">
                <img
                  src="/Top Activaty/david-marcu-VfUN94cUy4o-unsplash.jpg"
                  className="img-fluid"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
