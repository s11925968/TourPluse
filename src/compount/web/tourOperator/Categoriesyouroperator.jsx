import React from 'react'
import './CategoriestourOperator.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../../shared/Loader';
export default function Categoriesyouroperator() {
  const {_id}=useParams();
  const getCatagoriesTourOperator =async()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_URL_LINK}/categories/tourOperator/${_id}`);
    return data.tourOperator;
  }
  const {data,isLoading}=useQuery('get_catagories_tour_operators',getCatagoriesTourOperator);
  if(isLoading){
    return <Loader/>
  }
  return (
    
    <div className="container">
      <div className='row Categoriesyouroperator'>
        {data.length? data.map((tour,index)=>
        <div className='col-md-4 text-center' key={tour._id}>
          <div >
          <img src={tour.image.secure_url}className='img-fluid'></img>
          </div>
          <p>name:{tour.name},address:{tour.address},phone:{tour.phoneNumber}<br/>
          phoneNumberEx:{tour.phoneNumberEx},<br/>description:{tour.description}</p>
        </div>
        ):"no data available"
      }
        </div>
    </div>
  );
}
