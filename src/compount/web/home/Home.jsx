import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { faBehance, faDribbble, faFacebook, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
export default function Home() {
  return (
    <div>
      <header className="header">
        <div className="info-header">
          <div className="info-home text-center">
            <div className="d-flex d-flex justify-content-center align-items-center">
              <p>Welcome to Tourpulse</p>
            </div>
            <h1 className="text-white">
              Travel &amp; Tour Booking
              <br /> WordPress Theme
            </h1>
            <span>
              Revolutionizing the Way
              <br /> You Plan Adventures!
            </span>
            <div className="content-public rounded-pill py-2 mt-3 bg-main-color m-auto d-none">
              <Link to="/Contact/create" className="text-decoration-none">
                create account
              </Link>
              
            </div>
            <div className="icons">
            <FontAwesomeIcon icon={faFacebook} className='brand brand-face'/>
            <FontAwesomeIcon icon={faDribbble} className='brand brand-dribble'/>
            <FontAwesomeIcon icon={faBehance}  className='brand brand-behance'/>
            <FontAwesomeIcon icon={faLinkedinIn} className='brand brand-linked'/>
            <FontAwesomeIcon icon={faGoogle}   className='brand brand-google'/>
            
              </div>
          </div>
        </div>
      </header>
    </div>
  );
}
