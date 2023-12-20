import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function DeleteTour() {
  const { id } = useParams();
  const navigite=useNavigate();
  const removeTour = async () => {
    try {
      const token = localStorage.getItem('companyToken');
      const { data } = await axios.patch(
        `${import.meta.env.VITE_URL_LINK}/tour/softDelete/${id}`,
        {},
        {
          headers: {
            Authorization: `ghazal__${token}`,
          },
        }
      );
      if(data.message=="success"){
        toast.success('delete success', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          navigite('/dashboard/tour/getActive');
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  useEffect(() => {
    removeTour();
  },[]);

  return <div>DeleteTour</div>;
}
