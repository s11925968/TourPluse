import axios from 'axios';
import React, { useEffect, useState } from 'react'; // Add import statement for useState
import Loader from '../../shared/Loader';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Agencies() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [current, setCurrent] = useState(1);
  const [title, setTitle] = useState(null);
  const [dataOperater, setdataOperater] = useState(null); // Fix the state variable name
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState(null);

  const getOperator = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('userToken');
      const params = new URLSearchParams();
      params.append('page', current);
      const searchValue = searchInput.trim().toLowerCase(); // Convert search input to lowercase

      if (searchValue !== "") {
        params.append("search", searchValue);
      }

      if (selectedSortOption) {
        params.append("sort", selectedSortOption);
      }
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_LINK}/operator/getActive?${params.toString()}&limit=24`
      );
      setTitle(data.title);
      setdataOperater(data.tourOperator);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
console.log(dataOperater);
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };
  
  const handleSortChange = (event) => {
    setSelectedSortOption(event.target.value);
  };
  
  const handleCategoryClick = (categoryId) => {
    const clickedCategory = dataOperater.find(
      (category) => category._id === categoryId
    );
    setSelectedCategory(clickedCategory);
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
  }, [current,selectedSortOption]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="category-serives container pt-5">
      <div className="info-category">
        <h2>All AGENCIES</h2>
        <form className='py-2'>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    getOperator();
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </form>
          <div className="mb-4 w-25 d-flex justify-content-end w-100 ">
        <div>
        <label>Sort by:</label>
          <select
            className="form-control"
            value={selectedSortOption}
            onChange={handleSortChange}
          >
            <option value="">None</option>
            <option value="name">User Name</option>
            <option value="address">Address</option>
            <option value="founderName">Founder Name</option>
          </select>
        </div>
        </div>
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
                  <Link
                    to={`/company/${selectedCategory._id}/review`}
                    className="btn btn-info me-3"
                  >
                    Create Review
                  </Link>
                  <button
                    className="btn btn-info me-3"
                    onClick={() => setShowComments(!showComments)}
                  >
                    {showComments ? "Hide Comments" : "Show Comments"}
                  </button>
                  <Link
                    to={`/tour/get/${selectedCategory._id}`}
                    className="btn btn-info"
                  >
                    Show Tours
                  </Link>
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
              {dataOperater?.map((tourOperator, index) => {
                const operatorAvgRating = calculateAvgRating(tourOperator.rev);
                return (
                  <div
                    className="col-lg-3 services-image text-center my-3"
                    key={tourOperator.name}
                    onClick={() => handleCategoryClick(tourOperator._id)}
                  >
                    <img
                      src={tourOperator.image.secure_url}
                      alt={`Operator ${tourOperator._id}`}
                      className=""
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
                    <h5>{tourOperator.name.split(" ").slice(0, 3).join(" ")}...</h5>
                    <Link to="#" className="btn btn-info">
                        Show Details
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
    </section>
  );
}
