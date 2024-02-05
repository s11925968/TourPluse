import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Loader from "../../shared/Loader";
import "./Getoperator.css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Home({ users }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dataOperater, setDataOperater] = useState(null);
  const [selectedOperater, setSelectedOperater] = useState(null);

  const getOperator = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_URL_LINK
        }/operator/get?status=Inactive&limit=50`,
        {
          headers: {
            Authorization: `ghazal__${token}`,
          },
        }
      );
      setDataOperater(data.tourOperator);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const getCategories = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_LINK}/tour/get?isDeleted=true&limit=200`,
        {
          headers: {
            Authorization: `ghazal__${token}`,
          },
        }
      );
      setData(data.tour);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCategories();
    getOperator();
  }, []);
  const handleOperaterClick = (operaterId) => {
    setSelectedOperater((prevOperater) =>
      prevOperater && prevOperater._id === operaterId
        ? null
        : dataOperater.find((tour) => tour._id === operaterId)
    );
  };
  const handleProductClick = (productId) => {
    const clickedProduct = data.find((tour) => tour._id === productId);

    // Toggle selectedProduct state to show/hide details
    setSelectedProduct((prevProduct) =>
      prevProduct && prevProduct._id === clickedProduct._id
        ? null
        : clickedProduct
    );
  };

  const filteredTours = data
    ? data.filter((tour) => tour.isDeleted === true)
    : [];
  const showNavigation = filteredTours.length > 0;

  const renderPrevButton = () => {
    if (!showNavigation) return null;

    return <Swiper.Navigation.Prev />;
  };

  const renderNextButton = () => {
    if (!showNavigation) return null;

    return <Swiper.Navigation.Next />;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="category-serives pt-5">
      <div>
        <div className="info-Deleted ms-5">
          <h2>Deleted Tours</h2>
        </div>
        <Swiper
          spaceBetween={20}
          breakpoints={{
            600: {
              slidesPerView: 1.3,
            },
            900: {
              slidesPerView: 2.3,
            },
            1024: {
              slidesPerView: 3.3,
            },
          }}
          navigation={{
            prevEl: renderPrevButton,
            nextEl: renderNextButton,
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
        >
          {filteredTours.length > 0 ? (
            filteredTours.map((tour) => (
              <SwiperSlide key={tour._id} className="col-lg-3 mb-4">
                <div className="images-tour">
                  <img
                    src={tour.image.secure_url}
                    className="w-100 images"
                    alt={tour.name}
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-center text-black">
                    {tour.name.split(" ").slice(0, 3).join(" ")}..
                  </h4>
                  <Link
                    to="#"
                    className="info-tour btn btn-primary "
                    onClick={() => handleProductClick(tour._id)}
                  >
                    Details
                  </Link>
                  <Link
                    to={`/admin/tour/forceDelete/${tour._id}`}
                    className="info-tour btn btn-primary ms-2"
                  >
                    Force Delete
                  </Link>
                  <Link
                    to={`/admin/tour/restore/${tour._id}`}
                    className="info-tour btn btn-primary ms-2"
                  >
                    Restore Tour
                  </Link>

                  {selectedProduct && selectedProduct._id === tour._id && (
                    <div>
                      <p>Price: ${tour.price}</p>
                      <p>
                        Start Date:{" "}
                        {new Date(tour.startDate).toLocaleDateString()}
                      </p>
                      <p>
                        End Date: {new Date(tour.endDate).toLocaleDateString()}
                      </p>
                      <p>
                        {tour.discount ? "discount: " + tour.discount : null}
                      </p>
                      <p>
                        {tour.description
                          ? "description: " + tour.description
                          : null}
                      </p>
                      <p>
                        {tour.finalPrice
                          ? "Final Price: " + tour.finalPrice
                          : null}
                      </p>
                      <p>
                        {tour.location ? "location: " + tour.location : null}
                      </p>
                      <p>{tour.meals ? "Meals: " + tour.meals : null}</p>
                      <p>{tour.note ? "Note: " + tour.note : null}</p>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p>No data available</p>
          )}
        </Swiper>
      </div>
      <div>
        <div className="info-Inactive ms-5">
          <h2>Inactive Agencies</h2>
        </div>
        <Swiper
          spaceBetween={20}
          breakpoints={{
            600: {
              slidesPerView: 1.3,
            },
            900: {
              slidesPerView: 2.3,
            },
            1024: {
              slidesPerView: 3.3,
            },
          }}
          navigation={{
            prevEl: renderPrevButton,
            nextEl: renderNextButton,
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
        >
          {dataOperater && dataOperater.length > 0 ? (
            dataOperater.map((tour) => (
              <SwiperSlide key={tour._id} className="col-lg-3 mb-4">
                <div className="images-tour">
                  <img
                    src={tour.image.secure_url}
                    className="images"
                    alt={tour.name}
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-center text-black">
                    {tour.name.split(" ").slice(0, 3).join(" ")}
                  </h4>
                  <Link
                    to="#"
                    className="info-tour btn btn-primary"
                    onClick={() => handleOperaterClick(tour._id)}
                  >
                    Details
                  </Link>
                  <Link
                    to={`/admin/tour/get/${tour._id}`}
                    className="btn btn-primary ms-2"
                  >
                    Show Tours
                  </Link>
                  <Link
                    to={`/admin/operator/UpdateOperator/${tour._id}`}
                    className="btn btn-primary ms-2"
                  >
                    Update Agency
                  </Link>
                  {selectedOperater && selectedOperater._id === tour._id && (
                    <div className="col-md-12 text-center">
                      <h2>{selectedOperater.name}</h2>
                      <p>{selectedOperater.description}</p>
                      <p>{selectedOperater.address}</p>
                      <p>{selectedOperater.email}</p>
                      <p>{selectedOperater.phoneNumber}</p>
                      <p>{selectedOperater.founderName}</p>
                      <div className="d-flex w-100 justify-content-center"></div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p>No data available</p>
          )}
        </Swiper>
      </div>
    </section>
  );
}
