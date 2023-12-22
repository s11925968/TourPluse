import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../shared/Loader";
import { Link } from "react-router-dom";
import "./users.css";

export default function Users() {
  const getUser = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_URL_LINK}/user/profile`
    );
    return data.users;
  };

  const { data, isLoading } = useQuery("get_user", getUser);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="contenent-flex">
        <div className="dispaly">
          <section className="users">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">name</th>
                  <th scope="col">Email</th>
                  <th scope="col">age</th>
                  <th scope="col">status</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((user, index) => (
                    <React.Fragment key={user._id}>
                      <tr>
                        <td>#{index}</td>
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>{user.status}</td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No user data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      </div>
  );
}