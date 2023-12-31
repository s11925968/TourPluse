import React, { useState, useEffect} from "react";
import axios from "axios";
import Loader from "../../shared/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';
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
  const [t,i18n]=useTranslation("global");
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
  const handleBlogClick = (blogId) => {
    setSelectedBlog(selectedBlog === blogId ? null : blogId);
  };

  const getOperator = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      params.append("page", current);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_URL_LINK
        }/operator/getActive?${params.toString()}&limit=25`
      );
      const filteredData = data.tourOperator.filter((operator) => {
        const operatorAvgRating = calculateAvgRating(operator.rev);
        return operatorAvgRating >= 4;
      });
      setTitle(data.title);
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const getTours = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      params.append("page", current);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_URL_LINK
        }/tour/getActive?${params.toString()}&limit=24`
      );
      const toursWithAverageRating = data.tour.map((tour) => {
        const totalRating = tour.reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / (tour.reviews.length || 1); // Avoid division by zero
        return { ...tour, averageRating };
      });
  
      const filteredTours = toursWithAverageRating.filter((tour) => tour.averageRating >= 4);
      
      setDataTour(filteredTours);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching tour data:", error);
      throw error;
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
    getOperator();
    getBlogs();
    getTours();
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
          <div className="info-category py-3">
            <h2>SERVICES</h2>
          </div>
          <div className="services my-5">
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
      <div className="">
        <div className="info-category">
          <h2>TOP TOURS</h2>
        </div>
        <div className="operator">
          <div className="container d-flex justify-content-start align-items-center">
            {dataTour && dataTour.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                navigation
                loop={true}
                autoplay={{
                  delay: 10000,
                }}
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
                {dataTour
                  .filter((tour) => tour.averageRating >= 1)
                  .map((tourOperator) => (
                    <SwiperSlide key={tourOperator._id}>
                      <Link
                        to={`/tour/details/${tourOperator._id}`}
                        className="text-decoration-none"
                      >
                        <div
                          className={`info-content-operator ${
                            selectedOperator === tourOperator._id
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => handleOperatorClick(tourOperator._id)}
                        >
                          <div className="swiper-hover operator-image">
                            <img
                              src={tourOperator.image.secure_url}
                              className="img-fluid"
                              alt={`Operator ${tourOperator._id}`}
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <h4 className="text-center w-75 text-black">
                              {tourOperator.name
                                .split(" ")
                                .slice(0, 4)
                                .join(" ")}
                              ...
                            </h4>
                          </div>
                          <p className="text-center">
                            <strong>{tourOperator.price}$</strong>
                          </p>
                          <p className="text-center">
                            {Array.from({
                              length: calculateAvgRating(tourOperator.reviews),
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
              <p>No top-rated tours available</p>
            )}
          </div>
        </div>
      </div>
      <section className="pagination-operater">
        <div className="container pt-5">
          <div className="info-category">
            <h2>TOP AGENCIES</h2>
          </div>
          <div className="services my-5">
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
                    <div>
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
                            slidesPerView: 2,
                          },
                          900: {
                            slidesPerView: 3,
                          },
                          1024: {
                            slidesPerView: 4,
                          },
                        }}
                      >
                        {selectedCategory.rev.map((review, index) => (
                          <SwiperSlide key={review._id}>
                            <div className="bg-info comment-detalis py-1">
                              <div>
                                {Array.from({ length: review.rating }).map(
                                  (_, starIndex) => (
                                    <FontAwesomeIcon
                                      key={starIndex}
                                      icon={faStar}
                                      className="text-warning"
                                    />
                                  )
                                )}
                                <div className="mx-2 bg-white comment-detalis">
                                <p>{review.comment}</p>
                              </div>
                              </div>
                              
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
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
                          className="operater col-md-3 services-image text-center my-3"
                          key={tourOperator.name}
                          onClick={() => handleCategoryClick(tourOperator)}
                        >
                          <img
                            src={tourOperator.image.secure_url}
                            alt={`Operator ${tourOperator._id}`}
                            className="hover-images w-100"
                          />
                          <p className="pt-3">
                            {Array.from({ length: operatorAvgRating }).map(
                              (_, starIndex) => (
                                <FontAwesomeIcon
                                  key={starIndex}
                                  icon={faStar}
                                  className="text-warning"
                                />
                              )
                            )}
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
                  <nav aria-label="Page navigation example ">
                    <ul className="pagination justify-content-center my-5">
                      <li
                        className={`z-1 page-item ${
                          current === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageClick(current - 2)}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: Math.ceil(title / 25) || 0 }).map(
                        (_, pageIndex) => (
                          <li
                            key={pageIndex}
                            className={`z-1 page-item ${
                              current === pageIndex + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageClick(pageIndex)}
                            >
                              {pageIndex + 1}
                            </button>
                          </li>
                        )
                      )}
                      <li
                        className={`z-1 page-item ${
                          current === Math.ceil(title / 8) ? "disabled" : ""
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
          <h2>About us</h2>
          <div className="col-md-6 about-info">
            <p className="fs-3 ">
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
          <div className="col-md-6 image-about">
            {/* <img src="/images/info-images.jpg" alt="image-abour-us" /> */}
            <img src="/images/info-images.jpg" />
          </div>
        </div>
      </section>
      <div>
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
