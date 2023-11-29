import React from 'react'
import './catagories.css'
import axios from 'axios'
import { useQuery } from 'react-query'
export default function Catagouries() {
  const getCatagories =async()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_URL_LINK}/categories/get`)
    return data;
  }

  const {data}=useQuery('get_catagories',getCatagories);
  console.log(data);

  return (
    <div className='catagories container d-flex justify-content-start align-items-center'>
      <div className='row'>
        {
          data?.categories.length?data?.categories.map((catagourie)=>(
            <div className='col-md-4' key={catagourie._id}>
            <img src={catagourie.image.secure_url} width="20%"/>
            <h2>{catagourie.name}</h2>
          </div>
          )
          ):"no data available"
        }
      </div>
    </div>

  )
}
