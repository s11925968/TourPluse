import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../shared/Loader.jsx'

export default function Touroperatorcategorite() {
  const {_id}=useParams();
  const getTourOperators=async()=>{
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_URL_LINK}/categories/allTourOperator/${_id}`, {
        headers: {
          Authorization: 'ghazal__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWYwYzIyOGEzODE1MGU3NDA5YTk3YiIsInN0YXR1cyI6IkFjdGl2ZSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcwMTEwMzk1OH0.djoZ8MEAuBDvMnqNo3QrNiAFosHpuuW0w8iMrHWRmlk'
        },
      });
      return data.tourOperator;
    } catch (error) {
      console.error('Error fetching admin data:', error);
      throw error;
    }
  }
  const {data,isLoading}=useQuery('gettouroperator',getTourOperators);
  if(isLoading){
    return <Loader />;
  }
  return (
    <div className="container py-5">
      <div className='row'>
        {data.length? data.map((tour,index)=>
        <div className='col-md-4 text-center' key={tour._id}>
          <div >
          <img src={tour.image.secure_url}className='img-fluid'></img>
          </div>
          <p>{tour.name}</p>
          <Link to={`/admin/categories/details/${tour._id}`}>Details</Link>

        </div>
        ):"no data available"
      }
      </div>
    </div>
  );
}
