import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../../shared/Loader.jsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import "./Tourlist.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function TourlistWeb() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [current, setCurrent] = useState(1);
  const [title, setTitle] = useState(null);
  const [tourStates, setTourStates] = useState({});
  const [dataTour, setDataTour] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [mealsIncluded, setMealsIncluded] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minDuration, setMinDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(30); // Assuming a maximum duration of 30 days, adjust as needed

  const getTours = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      params.append("page", current);

      if (searchInput.trim() !== "") {
        params.append("search", searchInput.trim());
      }

      if (selectedSortOption) {
        params.append("sort", selectedSortOption);
      }
      params.append("price[gt]", minPrice);
      params.append("price[lt]", maxPrice);

      if (selectedLocation) {
        params.append("location", selectedLocation);
      }

      params.append("duration[gt]", minDuration);
      params.append("duration[lt]", maxDuration);

      if (mealsIncluded !== null) {
        params.append("meals", mealsIncluded);
      }

      const { data } = await axios.get(
        `${
          import.meta.env.VITE_URL_LINK
        }/tour/getActive?${params.toString()}&limit=24`
      );

      setTitle(data.title);
      setDataTour(data.tour);
      setTourStates(
        Object.fromEntries(data.tour.map((tour) => [tour._id, false]))
      );
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching tour data:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePriceChange = (value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };
  const handleDurationChange = (value) => {
    setMinDuration(value[0]);
    setMaxDuration(value[1]);
  };

  const handleProductClick = (productId) => {
    const clickedProduct = dataTour.find((tour) => tour._id === productId);
    setSelectedProduct((prevProduct) =>
      prevProduct && prevProduct._id === clickedProduct._id
        ? null
        : clickedProduct
    );
  };

  const handlePageClick = (pageNumber) => {
    setCurrent(pageNumber + 1);
    setSelectedProduct(null);
  };
  const calculateAvgRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round(totalRating / reviews.length);
  };
  const handleClearAll = () => {
    setMinPrice(0);
    setMaxPrice(5000);
    setMinDuration(0);
    setMaxDuration(30);
    setSelectedLocation("");
    setMealsIncluded(null);
  };

  const handleSortOptionChange = (event) => {
    setSelectedSortOption(event.target.value);
  };

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      getTours();
    }, 1000);

    return () => clearTimeout(delayTimer);
  }, [
    current,
    selectedSortOption,
    minPrice,
    maxPrice,
    selectedLocation,
    mealsIncluded,
    minDuration,
    maxDuration,
    searchInput,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="d-flex">
      <aside className="aside">
        <div className="row">
          <div className="col-md-6">
            <h2>Filters</h2>
          </div>

          <div className="col-md-6">
            <div className="form-group w-100 ">
              <button
                className="btn btn-info text-white"
                onClick={handleClearAll}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
        <div className="form-group py-4">
          <label>Price Range</label>
          <Slider
            range
            value={[minPrice, maxPrice]}
            onChange={handlePriceChange}
            min={0}
            max={5000}
          />
          <div className="d-flex justify-content-between mt-2">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>
        </div>
        <div className="form-group py-4">
          <label>Duration Range</label>
          <Slider
            range
            value={[minDuration, maxDuration]}
            onChange={handleDurationChange}
            min={0}
            max={30}
          />
          <div className="d-flex justify-content-between mt-2">
            <span>{minDuration} days</span>
            <span>{maxDuration} days</span>
          </div>
        </div>

        <div className="form-group py-4">
          <label>Select Location:</label>
          <select
            className="form-control"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="South America">South America</option>
            <option value="Germany">Germany</option>
            <option value="Egypt">Egypt</option>
            <option value="India">India</option>
            <option value="Maldives">Maldives</option>
            <option value="America">America</option>
            <option value="Palestine">Internal Tour</option>
            <option value="Austria">Austria</option>
            <option value="Belgium">Belgium</option>
            <option value="Belgium/Luxembourg">Belgium / Luxembourg</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Croatia">Croatia</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czechia">Czechia</option>
            <option value="Denmark">Denmark</option>
            <option value="Estonia">Estonia</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Greece">Greece</option>
            <option value="Hungary">Hungary</option>
            <option value="Ireland">Ireland</option>
            <option value="Italy">Italy</option>
            <option value="Latvia">Latvia</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Malta">Malta</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Romania">Romania</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Spain">Spain</option>
            <option value="Sweden">Sweden</option>
          </select>
        </div>

        <div className="form-group py-4">
          <label>Meals:</label>
          <div>
            <label className="pe-3">
              <input
                type="radio"
                value="included"
                checked={mealsIncluded === "included"}
                onChange={() => setMealsIncluded("included")}
              />
              Included
            </label>
            <label className="pe-3">
              <input
                type="radio"
                value="everything"
                checked={mealsIncluded === "everything"}
                onChange={() => setMealsIncluded("everything")}
              />
              Everything
            </label>
            <label className="pe-3">
              <input
                type="radio"
                value="Traditional"
                checked={mealsIncluded === "Traditional"}
                onChange={() => setMealsIncluded("Traditional")}
              />
              Traditional
            </label>
          </div>
        </div>
      </aside>
      <div className="tourlist-web container z-1">
        <div className="search col-12 mb-4 w-50 m-auto border border-5 border-info">
          <form>
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
                  className="btn btn-outline-secondary bg-info"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    getTours();
                  }}
                >
                  <FontAwesomeIcon icon={faSearch} className="text-white" />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="mb-4 w-25 d-flex justify-content-end w-100 ">
          <div>
            <label className="me-1">Sort By: </label>
            <select
              className="search border border-5 border-info p-1"
              value={selectedSortOption}
              onChange={handleSortOptionChange}
            >
              <option value="">None</option>
              <option value="-price">Price High To Low</option>
              <option value="price">Price Low To High</option>
              <option value="startDate">Start Date</option>
              <option value="duration">Duration</option>
              <option value="-createdAt">Recently Added</option>
            </select>
          </div>
        </div>
        <div className="row">
          {dataTour && dataTour.length ? (
            <>
              {dataTour.map((tour) => (
                <div key={tour._id} className="col-lg-4 mb-4 tour-pointer">
                  <div className="image">
                    <img src={tour.image.secure_url} alt={tour.name} />
                  </div>
                  <div className="text-center">
                    <h3>{tour.name.split(" ").slice(0, 4).join(" ")}...</h3>
                    <p>Price: ${tour.price}</p>
                    <p>
                      Start Date:{" "}
                      {new Date(tour.startDate).toLocaleDateString()}
                    </p>
                    <p>
                      End Date: {new Date(tour.endDate).toLocaleDateString()}
                    </p>
                    <p className="py-3">
                      {Array.from({
                        length: calculateAvgRating(tour.reviews),
                      }).map((_, starIndex) => (
                        <FontAwesomeIcon
                          key={starIndex}
                          icon={faStar}
                          className="text-warning"
                        />
                      ))}
                    </p>
                    <Link
                      to={`/tour/details/${tour._id}`}
                      className="btn btn-info"
                      onClick={() => handleProductClick(tour._id)}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
              <div className="col-md-12">
                <nav aria-label="Page navigation example">
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
                    {Array.from({ length: Math.ceil(title / 24) || 0 }).map(
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
              </div>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </section>
  );
}
