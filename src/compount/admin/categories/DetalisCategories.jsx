
import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../shared/Loader.jsx'

export default function DetalisCategories() {
  const {_id}=useParams();
  const getDetalis=async()=>{
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_URL_LINK}/categories/${_id}`, {
        headers: {
          Authorization: 'ghazal__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjQ1ZGNlYjA5ZTZiNTk5NTdkZjllNCIsInN0YXR1cyI6IkFjdGl2ZSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcwMTA3ODA3NX0.t4rh4-2o1rhC0lHwhEhl9Xw2zt2WE-GYGQIvi_ubRuo'
        },
      });
      return data;
    } catch (error) {
      console.error('Error fetching admin data:', error);
      throw error;
    }
  }
  const {data,isLoading}=useQuery('gettouroperator',getDetalis);
  console.log(data);
  if(isLoading){
    return <Loader />;
  }
  return (
    <div className="container py-5">
      <div className="row">
        {data.length
          ? data.map((details) => (
              <div className="col-md-4 text-center" key={details._id}>
                <div>
                  <img
                    src={details.image.secure_url}
                    className="img-fluid"
                  ></img>
                </div>
                <p>{details.name}</p>
              </div>
            ))
          : "no data available"}
      </div>
    </div>
  );
}
