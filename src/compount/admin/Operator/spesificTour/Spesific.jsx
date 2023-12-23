import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Loader from '../../../shared/Loader.jsx';
import { Link, useParams } from 'react-router-dom';

export default function SpesificTour() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dataTour, setData] = useState("");
  const [loading,setLoading] = useState(false);
  const {_id}=useParams();
  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_URL_LINK}/operator/getTour/${_id}`);
      setData(data.tour);
    } catch (error) {
      console.error('Error fetching tour data:', error);
    }
    finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, [_id]); 

  const handleProductClick = (productId) => {
    const clickedProduct = dataTour.find((tour) => tour._id === productId);
    setSelectedProduct((prevProduct) =>
      prevProduct && prevProduct._id === clickedProduct._id ? null : clickedProduct
    );
  };
  if(loading){
    return <Loader/>
  }
  return (
    <div className="container py-4">
      <div className="row">
        {dataTour && dataTour.length ? (
          dataTour.map((tour) => (
            <div key={tour._id} className="col-lg-4 mb-4">
              <div>
                <img src={tour.image.secure_url} className="w-100" alt={tour.name} />
              </div>
              <div className='text-center'>
                <h3>{tour.name}</h3>
                <p>Price: ${tour.price}</p>
                <p>Start Date: {new Date(tour.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(tour.endDate).toLocaleDateString()}</p>
                <Link to="#" className="btn btn-primary" onClick={() => handleProductClick(tour._id)}>
                  Details
                </Link>
                {selectedProduct && selectedProduct._id === tour._id && (
                  <div>
                    <p>Tour: {tour.discount}</p>
                    <p>{tour.description}</p>
                    <p>Final Price: {tour.finalPrice}</p>
                    <p>Location: {tour.location}</p>
                    <p>Meals: {tour.meals}</p>
                    <p>Note: {tour.note}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}
