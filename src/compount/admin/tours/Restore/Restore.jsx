import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Restore() {
  const { _id } = useParams();
  const navigate = useNavigate();

  const restoreTour = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.patch(
        `${import.meta.env.VITE_URL_LINK}/tour/restore/${_id}`,
        {},
        {
          headers: {
            Authorization: `ghazal__${token}`,
          },
        }
      );
      if(data.message=='success'){
        toast.success('Restore success', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate('/admin')
      }
      else{
        toast.error('Restore failed. Please try again.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error restoring tour:', error);
    }
  }

  useEffect(() => {
    restoreTour();
  }, [_id]);
}
