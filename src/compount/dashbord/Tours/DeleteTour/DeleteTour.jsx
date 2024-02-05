import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../shared/Loader'
export default function ForceDelete() {
  const { id } = useParams();
  const [loading,setLoading] = useState(false );
  const navigite=useNavigate();
  const handleDeleteConfirmation = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this tour?');
    
    if (isConfirmed) {
      removeTour();
    } else {
      navigite('/dashboard'); 
    }
  };

  const removeTour = async () => {
    try {
      setLoading(true);
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

      if (data.message === 'success') {
        toast.success('Delete success', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        navigite('/dashboard');
      }
    } catch (error) {
      console.error('Error deleting tour:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleDeleteConfirmation(); // Show the confirmation dialog on component mount
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <div>DeleteTour</div>;
}
