import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../shared/Loader';

export default function DeleteTour() {
  const { _id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const removeTour = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('userToken');
      const { data } = await axios.delete(
        `${import.meta.env.VITE_URL_LINK}/tour/forceDelete/${_id}`,
        {
          headers: {
            Authorization: `ghazal__${token}`,
          },
        }
      );
      if (data.message === "success") {
        toast.success('Delete success', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate('/admin/tour/get');
      } else {
        toast.error('Delete failed. Please try again.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
      toast.error('An unexpected error occurred. Please try again later.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    removeTour();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <div>DeleteTour</div>;
}
