import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <div>
      <header className="header">
        <div className="info-header">
          <div className="info-home text-center">
            <div className='d-flex d-flex justify-content-center align-items-center'>
            <p>Welcome to Tourpulse</p>
            </div>
            <h1 className="text-white">
              Travel &amp; Tour Booking
              <br /> WordPress Theme
            </h1>
            <span>Revolutionizing the Way<br/> You Plan Adventures!</span>
            <div className="content-public rounded-pill py-2 mt-3 bg-main-color m-auto d-none">
              <Link to="/Contact/create" className="text-decoration-none">
                create account
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
