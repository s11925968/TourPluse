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
      <div className="row Categoriesyouroperator">
        {data?.length
          ? data.map((tourOperator) => (
              <div className="col-md-6" key={tourOperator._id}>
                <img src={tourOperator.image.secure_url}></img>
                <h2>{tourOperator.name}</h2>
              </div>
            ))
          : "no data available"}
      </div>
    </div>
  );
}
