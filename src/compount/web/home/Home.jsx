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
        }/operator/getActive?${params.toString()}&limit=8`
      );
      setTitle(data.title);
      setData(data.tourOperator);
    } catch (error) {
      console.error("Error fetching data:", error);
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
        <div className="info-category">
          <h2>SERVICES</h2>
          <p>We Offer Best Services</p>
        </div>
        <div className="services my-5">
          <div className="row">
            <div className="col-lg-3 col-md-6 services-image text-center">
              <img
                src="/img/serives/castle.png"
                className="img-fluid"
                alt="Historical Tours"
              />
              <h4 className="py-3">Historical Tours</h4>
              <p>
                Visit ancient historical landmarks full of ancient monuments and
                civilizations
              </p>
            </div>
            <div className="col-lg-3 col-md-6 services-image text-center">
              <img src="/img/serives/plane.png" alt="Best Flights Options" />
              <h4 className="py-3">Best Flights Options</h4>
              <p>
                Various flight classes, First class, Business Class, Premium
                Economy Class, and Economy Class
              </p>
            </div>
            <div className="col-lg-3 col-md-6 services-image text-center">
              <img src="/img/serives/rock.png" alt="Islamic Tours" />
              <h4 className="py-3">Islamic Tours</h4>
              <p>
                Hajj and Umrah tours, with appropriate guide and schedule, with
                all reservations needed
              </p>
            </div>
            <div className="col-lg-3 col-md-6 services-image text-center">
              <img
                src="/img/serives/flight.png"
                className="img-fluid"
                alt="Diversity"
              />
              <h4 className="py-3">Diversity</h4>
              <p>
                There are a large number of trips of various types available to
                meet the needs of a large segment of travelers
              </p>
            </div>
          </div>
        </div>
        </div>
      
      </section>
      <div className="operator">
        <div className="container d-flex justify-content-start align-items-center ">
          {data && data.length > 0 ? (
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
                900: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              <h2 className="py-3">All Agencies</h2>
              {data.map((tourOperator) => (
                <SwiperSlide key={tourOperator._id}>
                  <Link
                    to={`/tour/get/${tourOperator._id}`}
                    className="text-decoration-none"
                  >
                    <div
                      className={`info-content-operator ${
                        selectedOperator === tourOperator._id ? "selected" : ""
                      }`}
                      onClick={() => handleOperatorClick(tourOperator._id)}
                    >
                      <div className="operator-image my-5">
                        <img
                          src={tourOperator.image.secure_url}
                          className="img-fluid"
                          alt={`Operator ${tourOperator._id}`}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                      <h4 className="py-3 text-center w-75">
                        {tourOperator.name.split(" ").slice(0, 4).join(" ")}...
                      </h4>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>No agencies available</p>
          )}
        </div>
      </div>
      <section className="pagination-operater">
        <div className="container pt-5">
        <div className="info-category">
          <h2>AGENCIES</h2>
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
                <div className="d-flex justify-content-center align-items-center">
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
                          slidesPerView: 1,
                        },
                        900: {
                          slidesPerView: 1,
                        },
                        1024: {
                          slidesPerView: 1,
                        },
                      }}
                    >
                      {selectedCategory.rev.map((review, index) => (
                        <SwiperSlide key={review._id}>
                          <div>
                            <h1>Comment {index + 1}</h1>
                            <h2>{review.comment}</h2>
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
                  return (
                    <div
                      className="col-md-6 services-image text-center my-3"
                      key={tourOperator.name}
                      onClick={() => handleCategoryClick(tourOperator)}
                    >
                      <img
                        src={tourOperator.image.secure_url}
                        alt={`Operator ${tourOperator._id}`}
                        className="w-100"
                      />
                      <p className="py-3">
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
                      <h4 className="py-3">
                        {tourOperator.name.split(" ").slice(0, 4).join(" ")}...
                      </h4>
                      <Link to="#" className="btn btn-info">
                        Click To Show Details
                      </Link>
                    </div>
                  );
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
                    {Array.from({ length: Math.ceil(title / 8) || 0 }).map(
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
      <div>
      {BlogsData && BlogsData.length > 0 ? (
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
                <div className="operator-image my-5">
                  <img
                    src="/images/images.jpeg"
                    alt={`Blog ${blogs._id}`}
                    className="img-fluid"
                  />
                </div>
                <div className="text-center">
                  <h3>{blogs.title}</h3>
                  <Link
                    className="btn btn-info"
                    to={`/details/${blogs._id}`} // Specify the correct route for details
                  >
                    Details
                  </Link>
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
        <div className="mt-5 info-map position-absolute bottom-0 w-100">
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
