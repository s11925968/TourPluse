import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Loader from '../../../shared/Loader';
import { Link } from 'react-router-dom';

export default function Admin() {
  const getAdmin = async () => {
    try {
      const token=localStorage.getItem('userToken');
      const { data } = await axios.get(`${import.meta.env.VITE_URL_LINK}/admin/get`, {
        headers: {
          Authorization: `ghazal__${token}`, // Replace YOUR_TOKEN_HERE with your actual token
        },
      });
      return data.users;
    } catch (error) {
      console.error('Error fetching admin data:', error);
      throw error;
    }
  };

  const { data,isLoading} = useQuery("getadmin", getAdmin);
  if(isLoading){
    return <Loader />;
  }
  return (
    <div className='container py-5'>
      <div className='row'>
      {
        data.length? data.map((user,index)=>
        <div className='col-md-3 text-center' key={user._id}>
          <div className='bg-secondary mt-4'>
          <h1>#{index}</h1>
          <h2 className='text-white'>{user.userName}</h2>
          <p className='text-white'>{user.email}</p>
          <Link to={`/admin/updata/${user._id}`}>updata</Link>
          </div>
        </div>
        ):"no admin available"
      }
      </div>
      
    </div>
  );
}
