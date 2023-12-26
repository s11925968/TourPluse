import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import { Link, Outlet, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../shared/Loader";

export default function Profile() {
  const { _id } = useParams();
  const token = localStorage.getItem("userToken");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("");

  const getProfile = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_LINK}/user/${_id}`,
        {
          headers: {
            Authorization: `ghazal__${token}`,
          },
        }
      );
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getProfile();
  }, [_id]);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className={style.bgcolor}>
      <div className={style.profile}>
        <div className={style.profileLinks}>
          <nav>
            <Link to="">info</Link>
            <hr />
            <Link to="contact">contact</Link>
            <hr />

            <Link to="changePassword">Change Password</Link>
            <hr />

            <Link to="changeEmail">Change Email</Link>
            <hr />
          </nav>
        </div>
        <div className={style.userData}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
