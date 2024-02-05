import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../../shared/Loader";
import { Link } from "react-router-dom";
import "./Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Admin({users}) {
  const [errorBack, setErrorBack] = useState("");
  const [dataAdmin, setData] = useState(null);
  const currentPage = localStorage.getItem("PageNumber") ? parseInt(localStorage.getItem("PageNumber"), 10) : 1;
  const [current, setCurrent] = useState(currentPage);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const getAdmin = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      params.append("page", current);
      if (searchInput.trim() !== "") {
        params.append("search", searchInput.trim());
        localStorage.removeItem("PageNumber");
        setCurrent(1);
      }
      if (selectedSortOption) {
        params.append("sort", selectedSortOption);
      }
      if (selectedStatus) {
        params.append("status", selectedStatus);
      }
      if (selectedRole) {
        params.append("role", selectedRole);
      }
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_URL_LINK
        }/admin/get?${params.toString()}&limit=6`,
        {
          headers: {
            Authorization: `ghazal__${token}`,
          },
        }
      );
      setTitle(data.title);
      setData(data.users);
    } catch (error) {
      setErrorBack(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrent(pageNumber + 1);
    localStorage.setItem("PageNumber", pageNumber + 1);
  };
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };
  const handleRoleChange = (status) => {
    setSelectedRole(status);
  };
  const handleDetailsClick = (user) => {
    setSelectedUser(selectedUser === user ? null : user);
  };
  const handleSortOptionChange = (event) => {
    setSelectedSortOption(event.target.value);
  };
  const handleClearAll = () => {
    setSelectedSortOption("");
    setSelectedStatus("");
    setSelectedRole("");
  };
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      getAdmin();
      localStorage.setItem('currentPage', current);
    }, 1000);
    return () => clearTimeout(delayTimer);
  }, [current, selectedRole, searchInput, selectedStatus, selectedSortOption]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="col-12 mt-3 z-1 w-50 m-auto border border-4 border-info  rounded-pill">
        <form>
          <div className="input-group">
            <input
              type="text"
              className="rounded-pill"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="d-flex">
        <aside className="aside-admin mt-5">
          <div className="row">
            <div className="col-md-6 ">
              <h2>Filters</h2>
            </div>
            <div className="col-md-6">
              <div className="form-group w-100 ">
                <button
                  className="btn btn-info text-white rounded-pill"
                  onClick={handleClearAll}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div>
              <div className="form-group">
                <label>Select Status</label>
                <div>
                  <select
                    className="form-control rounded-pill border-info"
                    value={selectedStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Select Role</label>
            <div>
              <select
                className="form-control rounded-pill border-info"
                value={selectedRole}
                onChange={(e) => handleRoleChange(e.target.value)}
              >
                <option value="">All</option>
                <option value="Admin">Admin</option>
                <option value="Superadmin">Superadmin</option>
              </select>
            </div>
          </div>
        </aside>
        <div className="container py-5">
          <div className="row">
            <div className="mb-4 w-25 d-flex justify-content-end w-100 ">
              <div>
                <label className="me-1">Sort By: </label>
                <select
                  className="search border border-2 border-info p-1"
                  value={selectedSortOption}
                  onChange={handleSortOptionChange}
                >
                  <option value="">None</option>
                  <option value="-age">Age High to Low</option>
                  <option value="age">Age Low To High</option>
                  <option value="userName">User Name</option>
                  <option value="-createdAt">Recently Added</option>
                </select>
              </div>
            </div>
            {dataAdmin && dataAdmin.length
              ? dataAdmin.map((user, index) => (
                  <div className="col-lg-4 text-center" key={user._id}>
                    <div className="bg-info py-3 admin mt-4">
                      <h2 className="text-white">{user.userName}</h2>
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={() => handleDetailsClick(user)}
                      >
                        Details
                      </button>
                      {selectedUser === user && (
                        <>
                          <p className="text-white">{user.email}</p>
                          <p className="text-white">{user.address}</p>
                          <p className="text-white">{user.phoneNumber}</p>
                          <p className="text-white">{user.role}</p>
                          <p className="text-white">{user.age}</p>
                          {users&& users.role === "Superadmin" && (
                            <Link
                              to={`/admin/updata/${user._id}`}
                              className="btn btn-success"
                            >
                              Update
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))
              : "No admin available"}
            <nav aria-label="Page navigation example ">
              <ul className="pagination justify-content-center my-5">
                <li
                  className={`z-1 page-item ${current <= 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageClick(current - 2)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: Math.ceil(title / 6) || 0 }).map(
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
                      pageIndex === Math.ceil(title / 6) - 1
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
                    current === Math.ceil(title / 6) ? "disabled" : ""
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
          <div className="text-center w-100">
            {errorBack && <p className="text text-danger">{errorBack}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
