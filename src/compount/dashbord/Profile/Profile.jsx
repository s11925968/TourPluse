import React, { useEffect, useState } from 'react';
import style from './Profile.module.css';
import { Link, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../shared/Loader';

export default function Profile() {
  const { _id } = useParams();
  const token = localStorage.getItem('userToken');
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("");

  const getProfile = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`${import.meta.env.VITE_URL_LINK}/operator/getOp/${_id}`);
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }
  useEffect(() => {
    getProfile();
  }, [_id]);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className={style.profile}>
      <div className={style.profileLinks}>
        <nav>
          <Link to="">Info</Link>
          <hr/>
          <Link to="contact">Contact</Link>
          <hr/>
          <Link to="ChangeInfo">Change Info</Link>
          <hr/>
          <Link to="changeEmail">Change Email</Link>
          <hr/>
        </nav>
      </div>
      <div className={style.userData}>
        <Outlet />
      </div>
    </div>
  );
}
