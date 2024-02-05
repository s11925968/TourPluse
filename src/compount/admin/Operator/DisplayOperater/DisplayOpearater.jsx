import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../shared/Loader";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
export default function DisplayOpearater() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [current, setCurrent] = useState(1);
  const [title, setTitle] = useState(null);
  const [dataOperater, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showComments, setShowComments] = useState(false); // Add showComments state
  const [searchInput, setSearchInput] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const getOperator = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("userToken");
      const params = new URLSearchParams();
      if (searchInput.trim() !== "") {
        params.append("search", searchInput.trim());
      }
      if (selectedCategoryId) {
        params.append("categoryId", selectedCategoryId);
      }
      if (selectedSortOption) {
        params.append("sort", selectedSortOption);
      }
      if (selectedStatus) {
        params.append("status", selectedStatus);
      }
      if (selectedLocation) {
        params.append("address", selectedLocation);
      }
      params.append("averageRating[gte]", minRating);
      params.append("averageRating[lte]", maxRating);

      params.append("page", current);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_URL_LINK
        }/operator/get?${params.toString()}&limit=20`,
        {
          headers: {
            Authorization: `ghazal__${token}`,
          },
        }
      );
      setTitle(data.title);
      setData(data.tourOperator);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleOperatorClick = (operatorId) => {
    const clickedOperator = dataOperater.find(
      (operator) => operator._id === operatorId
    );
    setSelectedOperator(clickedOperator);
  };
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };
  const handleSortOptionChange = (event) => {
    setSelectedSortOption(event.target.value);
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const handleRatingChange = (value) => {
    setMinRating(value[0]);
    setMaxRating(value[1]);
  };
  const handlePageClick = (pageNumber) => {
    setCurrent(pageNumber + 1);
    setSelectedCategory(null);
  };
  const handleClearAll = () => {
    setMinRating(0);
    setMaxRating(5);
    setSelectedLocation("");
    setSelectedStatus("");
    setSelectedCategoryId("");
  };
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      getOperator();
    }, 1000);
    return () => clearTimeout(delayTimer);
  }, [
    current,
    searchInput,
    minRating,
    maxRating,
    selectedSortOption,
    selectedLocation,
    selectedStatus,
    selectedCategoryId,
  ]);

  console.log(dataOperater);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="searchcol-12 mt-3 w-50 m-auto border border-5 border-info rounded-pill">
        <form>
          <div className="input-group z-1 ">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="d-flex">
        <aside className="aside-admin mt-5">
          <div className="col-md-6">
            <div className="form-group w-100 ">
              <button
                className="btn btn-info text-white "
                onClick={handleClearAll}
              >
                Clear All
              </button>
            </div>
          </div>
          <div className="form-group Select-Location">
            <label>Select Location:</label>
            <select
              className="form-control rounded-pill border-info"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All</option>
              <option value="Nablus">Nablus</option>
              <option value="Jenin">Jenin</option>
              <option value="Qalqilya">Qalqilya</option>
              <option value="Ramallah">Ramallah</option>
              <option value="Hebron">Hebron</option>
              <option value="Jericho">Jericho</option>
              <option value="Bethlehem">Bethlehem</option>
              <option value="Gaza">Gaza</option>
              <option value="Khan Yunis">Khan Yunis</option>
              <option value="Jerusalem">Jerusalem</option>
              <option value="Rafah">Rafah</option>
              <option value="Al-Bireh">Al-Bireh</option>
              <option value="Bayt Jala">Bayt Jala</option>
              <option value="Bayt Sahur">Bayt Sahur</option>
              <option value="Tulkarm">Tulkarm</option>
              <option value="Sebastia">Sebastia</option>
              <option value="Halhul">Halhul</option>
              <option value="Deir al Balah">Deir al Balah</option>
              <option value="Beitunia">Beitunia</option>
              <option value="Qalqilya">Qalqilya</option>
              <option value="Tubas">Tubas</option>
              <option value="Beit Lahia">Beit Lahia</option>
              <option value="Bani Suheila">Bani Suheila</option>
              <option value="Surif">Surif</option>
              <option value="Yamun">Yamun</option>
              <option value="ad-Dhahiriya">ad-Dhahiriya</option>
              <option value="Idhna">Idhna</option>
              <option value="Dura">Dura</option>
              <option value="Bani Naim">Bani Naim</option>
              <option value="Yata">Yata</option>
              <option value="Beit Ummar">Beit Ummar</option>
              <option value="Ya'bad">Ya'bad</option>
              <option value="Abasan al-Kabira">Abasan al-Kabira</option>
              <option value="Beit Hanoun">Beit Hanoun</option>
              <option value="Jabalia">Jabalia</option>
              <option value="Abu Dis">Abu Dis</option>
              <option value="Qabatiya">Qabatiya</option>
              <option value="Al'Eizariya">Al'Eizariya</option>
              <option value="Jannatah">Jannatah</option>
              <option value="Beit Aryeh-Ofarim">Beit Aryeh-Ofarim</option>
              <option value="Salfit">Salfit</option>
              <option value="Anata">Anata</option>
              <option value="Burin">Burin</option>
              <option value="Silwad">Silwad</option>
              <option value="Nahalin">Nahalin</option>
              <option value="Awarta">Awarta</option>
              <option value="Azzun">Azzun</option>
              <option value="Bayt Lid">Bayt Lid</option>
              <option value="al-Khader">al-Khader</option>
            </select>
          </div>
          <div className="form-group py-4">
            <label>Select Category:</label>
            <select
              className="form-control rounded-pill border-info"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              <option value="">All</option>
              <option value="6597fe1aa375577ca7ddecbd">INTERNAL</option>
              <option value="656fa08c14243f1b40d2e3c8">HAJ AND OMRA</option>
              <option value="656fa2f714243f1b40d2e3f9">WORLD WIDE</option>
            </select>
          </div>
          <div className="form-group py-4">
              <label>Rating Range</label>
              <Slider
                range
                value={[minRating, maxRating]}
                onChange={handleRatingChange}
                min={0}
                max={5} // Update max to 10 to allow increments of 0.5
                step={0.5} // Set the step to 0.5
              />
              <div className="d-flex justify-content-between mt-2">
                <span>{minRating}</span>
                <span>{maxRating}</span>
              </div>
            </div>
          <div className="form-group">
            <label>Select Status</label>
            <div>
              <label className="me-3">
                <input 
                  type="checkbox"
                  checked={selectedStatus === "Active"}
                  onChange={() => handleStatusChange("Active")}
                />
                Active
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedStatus === "Inactive"}
                  onChange={() => handleStatusChange("Inactive")}
                />
                Inactive
              </label>
            </div>
          </div>
        
        </aside>

        <section className="category-serives container pt-5">
          <div className="services">
            <div className="mb-4 w-25 d-flex justify-content-end w-100 pe-5">
              <div>
                <label className="me-1">Sort By: </label>
                <select
                  className="search border border-2 border-info"
                  value={selectedSortOption}
                  onChange={handleSortOptionChange}
                >
                  <option value="">None</option>
                  <option value="-createdAt">Recently Added</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
            <div className="row">
              {selectedCategory ? (
                <div className="col-md-12 text-center">
                  <h2>{selectedCategory.name}</h2>
                  <p>{selectedCategory.description}</p>
                  <p>{selectedCategory.address}</p>
                  <p>{selectedCategory.email}</p>
                  <p>{selectedCategory.phoneNumber}</p>
                  <p>{selectedCategory.founderName}</p>
                  <div className="d-flex w-100 justify-content-center">
                    <div className="text-center">
                      <Link
                        to={`/admin/operator/UpdateOperator/${selectedCategory._id}`}
                        className="btn btn-info me-4"
                      >
                        Update Agency
                      </Link>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <div>
                        <Link
                          to={`/admin/tour/get/${selectedCategory._id}`}
                          className="btn btn-info"
                        >
                          Show Tours
                        </Link>
                      </div>
                    </div>
                    {/* <button
                      className="btn btn-info ms-3"
                      onClick={() => setShowComments(!showComments)}
                    >
                      {showComments ? "Hide Comments" : "Show Comments"}
                    </button> */}
                  </div>
                  {/* {showComments && (
                  <div className="mt-5 d-flex justify-content-center text-center">
                  <div className="text-center">
                    <div
                      className="comment-box "
                      style={{ maxHeight: "320px", overflowY: "auto", alignItems:"center"}} // Adjusted maxHeight value
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
                )} */}
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
                    const avgRating = tourOperator.averageRating || 0; // Use 0 if averageRating is falsy

                    const fullStars = Math.floor(avgRating);
                    const hasHalfStar = avgRating % 1 !== 0;

                    return (
                      <div
                        className="col-lg-3 services-image text-center my-3"
                        key={tourOperator.name}
                        onClick={() => handleCategoryClick(tourOperator)}
                      >
                        <img
                          src={tourOperator.image.secure_url}
                          alt={`Operator ${tourOperator._id}`}
                          className=""
                        />
                        <p className="py-3">
                          {[...Array(fullStars)].map((_, starIndex) => (
                            <FontAwesomeIcon
                              key={starIndex}
                              icon={faStar}
                              className="text-warning"
                            />
                          ))}
                          {hasHalfStar && (
                            <FontAwesomeIcon
                              icon={faStarHalf}
                              className="text-warning"
                            />
                          )}
                        </p>
                        <h5>
                          {tourOperator.name.split(" ").slice(0, 3).join(" ")}
                          ...
                        </h5>
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
                      {Array.from({ length: Math.ceil(title / 20) || 0 }).map(
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
                            pageIndex === Math.ceil(title / 20) - 1
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
                          current === Math.ceil(title / 20) ? "disabled" : ""
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
      </div>
    </div>
  );
}
