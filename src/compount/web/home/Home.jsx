import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { faBehance, faDribbble, faFacebook, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEnvelope, faHouse, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <section id="about">
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
              <FontAwesomeIcon icon={faFacebook} className="brand brand-face" />
              <FontAwesomeIcon
                icon={faDribbble}
                className="brand brand-dribble"
              />
              <FontAwesomeIcon
                icon={faBehance}
                className="brand brand-behance"
              />
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="brand brand-linked"
              />
              <FontAwesomeIcon icon={faGoogle} className="brand brand-google" />
            </div>
          </div>
        </div>
      </header>
      <section className="map position-relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27002.02680188146!2d35.22707967947037!3d32.22434418493328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ce0f650425697%3A0x7f0ba930bd153d84!2sNablus!5e0!3m2!1sen!2s!4v1701524940071!5m2!1sen!2s"
          width="100%"
          height={650}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="info-map position-absolute bottom-0 w-100">
          <div className="container text-white rounded-top-3 p-3 py-4">
            <div className="row d-flex">
              <div className="col-lg-4 d-flex  justify-content-center">
                <div className="info d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="solid fs-4 d-flex justify-content-center align-items-center main-color pe-2"
                  />
                  <span>
                    Contact Number <br />
                    +972 595597630
                  </span>
                </div>
              </div>
              <div className="col-lg-4 d-flex  justify-content-center">
                <div className="info d-flex align-items-center text-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="solid fs-4 d-flex justify-content-center align-items-center main-color pe-2"
                  />
                  <spam>
                    Email Address
                    <br />
                    tourplusecompany@gmail.com
                  </spam>
                </div>
              </div>
              <div className="col-lg-4 d-flex  justify-content-center">
                <div className="info d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="solid fs-4 d-flex justify-content-center align-items-center main-color pe-2"
                  />
                  <span className="">
                    Location
                    <br />
                    nablues
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-us container">
        <div className="row info-images">
          <h2>About us</h2>
          
          <div className="col-md-6 about-info">
            <p>
              Tourpulse is a company based in Palestine that specializes in
              providing travel and tourism services. Established with the aim of
              creating memorable and seamless travel experiences, Tourpulse is
              committed to offering exceptional services to both local and
              international travelers.
              <Link to="/about">Read more about RateHawk 
          <FontAwesomeIcon icon={faArrowRight} />
          </Link>
            </p>
          </div>
          <div className="col-md-6 image-about">
            {/* <img src="/images/info-images.jpg" alt="image-abour-us" /> */}
            <img src="/images/info-images.jpg"/>
          </div>

        </div>
      </section>
    </section>
  );
}
