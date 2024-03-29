import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../shared/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import {
  faArrowRight,
  faEnvelope,
  faLocationDot,
  faPhone,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBehance,
  faDribbble,
  faFacebook,
  faGoogle,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Home.css";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

export default function Home({ users }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [BlogsData, setBlogsData] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [dataTour, setDataTour] = useState(null);
  const [title, setTitle] = useState(null);
  const token = localStorage.getItem("userToken");
  const [dataProfile, setDataProfile] = useState("");
  const id = users && users.id ? users.id : undefined;
  const getProfile = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_LINK}/user/${users.id}`,
        {
          headers: {
            Authorization: `ghazal__${token}`,
          },
        }
      );
      console.log(data);
      setDataProfile(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getOperator = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      params.append("page", current);
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_LINK}/operator/getTopOp`
      );
      setData(data.topRatedTours);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTours = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_URL_LINK}/reco/getHybRec/${id}`
      );
      const data = response.data;  
        setDataTour(data.validTours);
    } catch (error) {
      console.error("Error fetching tour data:", error);
      // You can handle the error here, e.g., display a message to the user
    } finally {
      setIsLoading(false);
    }
  };
  
  const getBlogs = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_URL_LINK}/blog`);
    setBlogsData(data.blogs);
  };

  const handleOperatorClick = (operatorId) => {
    const clickedOperator = data.find(
      (operator) => operator._id === operatorId
    );
    setSelectedOperator(clickedOperator);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handlePageClick = (pageNumber) => {
    setCurrent(pageNumber + 1);
    setSelectedCategory(null);
  };

  const calculateAvgRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round(totalRating / reviews.length);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getOperator();
      await getBlogs();
      await getProfile();
      await getTours();
    };
    fetchData();
  }, [current, id]);
  

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section id="about">
      <header className="header">
        <div className="info-header">
          <div className="info-home text-center">
            <div className="d-flex d-flex justify-content-center align-items-center">
              <p>Welcome to TourPulse</p>
            </div>
            <span>
              All Palestinian Trips offers,
              <br /> in the palm of your hand
            </span>
            <div className="icons">
              <FontAwesomeIcon icon={faFacebook} className="brand brand-face" />
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="brand brand-linked"
              />
              <FontAwesomeIcon icon={faGoogle} className="brand brand-google" />
            </div>
          </div>
        </div>
      </header>
      <section className="serives">
        <div className="container pt-5">
          <div className="info-SERVICES py-3">
            <h2>SERVICES</h2>
          </div>
          <div className="services">
            <div className="row">
              <div className="col-lg-3 col-md-6 services-flight text-center">
                <img
                  src="/img/serives/castle.png"
                  className="img-fluid w-50"
                  alt="Historical Tours"
                />
                <h4 className="py-3">Historical Tours</h4>
                <p>
                  Visit ancient historical landmarks full of ancient monuments
                  and civilizations
                </p>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <img
                  src="/img/serives/plane.png"
                  alt="Best Flights Options"
                  className="w-50"
                />
                <h4 className="py-3">Best Flights Options</h4>
                <p>
                  Various flight classes, First class, Business Class, Premium
                  Economy Class, and Economy Class
                </p>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <img
                  src="/img/serives/rock.png"
                  alt="Islamic Tours"
                  className="w-50"
                />
                <h4 className="py-3">Islamic Tours</h4>
                <p>
                  Hajj and Umrah tours, with appropriate guide and schedule,
                  with all reservations needed
                </p>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <img
                  src="/img/serives/flight.png"
                  className="img-fluid w-50"
                  alt="Diversity"
                />
                <h4 className="py-3">Diversity</h4>
                <p>
                  There are a large number of trips of various types available
                  to meet the needs of a large segment of travelers
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
      <div className="TOURS my-5">
        {users && (
          <div className="m-0">
            <div className="info-TOURS py-3">
              <h2>{`TOP PICKS FOR ${
                dataProfile?.user?.userName
                  ? dataProfile.user.userName.toUpperCase()
                  : "USER"
              }`}</h2>
            </div>
            {dataTour && dataTour.length > 0 ? (
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
                    slidesPerView: 1.3,
                  },
                  900: {
                    slidesPerView: 3.2,
                  },
                  1024: {
                    slidesPerView: 3.3,
                  },
                }}
                className="m-0"
              >
                {dataTour.map((tourDetails) => (
                  <SwiperSlide key={tourDetails._id}>
                    <Link
                      to={`/tour/details/${tourDetails._id}`}
                      className="text-decoration-none"
                    >
                      <div
                        className={`info-content-operator ${
                          selectedOperator === tourDetails._id ? "selected" : ""
                        }`}
                        onClick={() => handleOperatorClick(tourDetails._id)}
                      >
                        <div className="swiper-hover operator-image-home">
                          <img
                            src={tourDetails.image.secure_url}
                            className=""
                            alt={`Operator ${tourDetails._id}`}
                          />
                        </div>
                        <div className="d-flex justify-content-center">
                          <h4 className="text-center w-75 text-black">
                            {tourDetails.name.split(" ").slice(0, 5).join(" ")}
                            ...
                          </h4>
                        </div>
                        <p className="text-center">
                          <strong>{tourDetails.price}$</strong>
                        </p>
                        <p className="text-center">
                          {Array.from({
                            length: tourDetails.averageRating,
                          }).map((_, starIndex) => (
                            <FontAwesomeIcon
                              key={starIndex}
                              icon={faStar}
                              className="text-warning"
                            />
                          ))}
                        </p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>No Recommend for you</p>
            )}
          </div>
        )}
      </div>
      <section className="pagination-operater">
        <div className="container pt-5">
          <div className="info-category  py-3">
            <h2>TOP AGENCIES</h2>
          </div>
          <div className="services">
            <div className="row">
              {selectedCategory ? (
                <div className="col-md-12 text-center">
                  <h2>{selectedCategory.name}</h2>
                  <p>{selectedCategory.description}</p>
                  <p>{selectedCategory.address}</p>
                  <p>{selectedCategory.email}</p>
                  <p>{selectedCategory.phoneNumber}</p>
                  <p>{selectedCategory.founderName}</p>
                  <div className="">
                    <div>
                      {users && (
                        <Link
                          to={`/company/${selectedCategory._id}/review`}
                          className="btn btn-info me-3"
                        >
                          Create Review
                        </Link>
                      )}
                      <button
                        className="btn btn-info me-3"
                        onClick={() => setShowComments(!showComments)}
                      >
                        {showComments ? "Hide Comments" : "Show Comments"}
                      </button>
                      {users && (
                        <Link
                          to={`/tour/get/${selectedCategory._id}`}
                          className="btn btn-info"
                        >
                          Show Tours
                        </Link>
                      )}
                    </div>
                  </div>
                  {showComments && (
                    <div className="mt-5 d-flex justify-content-center text-center">
                      <div className="text-center">
                        <div
                          className="comment-box "
                          style={{
                            maxHeight: "320px",
                            overflowY: "auto",
                            alignItems: "center",
                          }} // Adjusted maxHeight value
                        >
                          {selectedCategory.rev.length > 0 &&
                            selectedCategory.rev.map((rev) => (
                              <div key={rev._id} className="w-100 ">
                                <div className="bg-info px-2 my-2 pb-1 comment-detalis">
                                  <p className="fs-5 m-auto text-center px-3">
                                    {Array.from({
                                      length: rev.rating,
                                    }).map((_, starIndex) => (
                                      <FontAwesomeIcon
                                        key={starIndex}
                                        icon={faStar}
                                        className="text-warning"
                                      />
                                    ))}
                                  </p>
                                  <div className="bg-white px-3 comment-details">
                                    <p>{rev.comment}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    className="btn btn-info mt-3"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Back to Categories
                  </button>
                </div>
              ) : (
                <>
                  {data?.map((tourOperator, index) => {
                    const operatorAvgRating = calculateAvgRating(
                      tourOperator.rev
                    );
                    if (operatorAvgRating >= 4) {
                      return (
                        <div
                          className="operater col-md-4 col-lg-3 services-image text-center my-3"
                          key={tourOperator.name}
                          onClick={() => handleCategoryClick(tourOperator)}
                        >
                          <img
                            src={tourOperator.image.secure_url}
                            alt={`Operator ${tourOperator._id}`}
                            className="hover-images w-100"
                          />
                          <p className="pt-3">
                            {Array.from({
                              length: tourOperator.averageRating,
                            }).map((_, starIndex) => (
                              <FontAwesomeIcon
                                key={starIndex}
                                icon={faStar}
                                className="text-warning"
                              />
                            ))}
                          </p>
                          <h4 className="py-1">
                            {tourOperator.name.split(" ").slice(0, 2).join(" ")}
                            ...
                          </h4>
                          <Link to="#" className="btn btn-info mb-3">
                            Click To Show Details
                          </Link>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center my-5">
                      <li
                        className={`z-1 page-item ${
                          current <= 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageClick(current - 2)}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: Math.ceil(title / 18) || 0 }).map(
                        (_, pageIndex) => {
                          const isWithinRange =
                            pageIndex + 1 >= current - 3 &&
                            pageIndex + 1 <= current + 3;
                          if (isWithinRange) {
                            return (
                              <li key={pageIndex} className="z-1 page-item">
                                <button
                                  className={`page-link ${
                                    current === pageIndex + 1 && current > 0
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() => handlePageClick(pageIndex)}
                                >
                                  {pageIndex + 1}
                                </button>
                              </li>
                            );
                          } else if (
                            pageIndex === 0 ||
                            pageIndex === Math.ceil(title / 18) - 1
                          ) {
                            // Render ellipsis for pages before the visible range and after the visible range
                            return (
                              <li
                                key={`ellipsis-${
                                  pageIndex === 0 ? "before" : "after"
                                }`}
                                className="z-1 page-item disabled"
                              >
                                <span className="page-link">...</span>
                              </li>
                            );
                          }
                          return null;
                        }
                      )}
                      <li
                        className={`z-1 page-item ${
                          current === Math.ceil(title / 18) ||
                          Math.ceil(title / 18) === 1
                            ? "disabled"
                            : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageClick(current)}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="about-us container">
        <div className="row info-images mt-5">
          <div className="info-About">
            <h2>ABOUT US</h2>
          </div>
          <div className="col-md-8 about-info">
            <p className=" ">
              Tour Pulse acts as an intermediary between travel agencies and
              travelers, allowing agencies to display their trips and offers and
              provide travelers with a range of trips, so it provides
              advertising for the agencies and providing a large selection of
              trips for travelers.
              <Link to="/about" className="ms-3">
                more about tourpulse
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </p>
          </div>
          <div className="col-md-4 image-about ">
            <img src="/images/icononly_transparent_nobuffer.png" />
          </div>
        </div>
      </section>
      <div className="BLOGS">
        {BlogsData && BlogsData.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            navigation
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              600: {
                slidesPerView: 1,
              },
              900: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {BlogsData.map((blogs) => (
              <SwiperSlide key={blogs._id}>
                <div>
                  <div className="blog-style text-center">
                    <h3 className="w-75 m-auto">{blogs.title}</h3>
                    {selectedBlog === blogs._id && <p>{blogs.description}</p>}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </section>
  );
}
