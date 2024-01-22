import React, { useEffect, useState } from 'react';
import Loader from '../../shared/Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import style from './Userinfo.module.css'; // Make sure to import your CSS module

export default function Usercontact() {
  const { _id } = useParams();
  console.log(_id);
  const token = localStorage.getItem("userToken");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("");

  const getProfile = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL_LINK}/operator/getOp/${_id}`
      );
      setData(data.operator);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  console.log(data);
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
            <td>Email</td>
            <td>{data.email}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{data.phoneNumber}</td>
          </tr>
          <tr>
            <td>phone Number Ex</td>
            <td>{data.phoneNumberEx}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
