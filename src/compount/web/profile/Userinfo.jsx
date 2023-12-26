import React, { useEffect, useState } from 'react';
import Loader from '../../shared/Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import style from './Userinfo.module.css'; // Make sure to import your CSS module

export default function Userinfo() {
  const { _id } = useParams();
  const token = localStorage.getItem('userToken');
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("");

  const getProfile = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_LINK}/user/${_id}`,
        {
          headers: {
            Authorization: `ghazal__${token}`
          }
        }
      );
      setData(data.user);
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
    <div className={style.userInfo}>
      <table className={style.userTable}>
        <tbody>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>User Name</td>
            <td>{data.userName}</td>
          </tr>
          <td>Age</td>
          <td>{data.age}</td>
        </tbody>
      </table>
    </div>
  );
}
