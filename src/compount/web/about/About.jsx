import React from 'react'
import './about.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
export default function About() {
  return (
    <div className="">
      <section className="about-style about-us container">
        <div className="row info-images">
          <h2>About us</h2>
          
          <div className="col-md-6 about-info">
            <p>
              Tourpulse is a company based in Palestine that specializes in
              providing travel and tourism services. Established with the aim of
              creating memorable and seamless travel experiences, Tourpulse is
              committed to offering exceptional services to both local and
              international travelers.
            </p>
          </div>
          <div className="col-md-6 image-about">
            {/* <img src="/images/info-images.jpg" alt="image-abour-us" /> */}
            <img src='/images/info-images.jpg'/>
          </div>
        </div>
      </section>
      <section className="adventures">
        <div className="container rounded-2 px-2">
          <div className="pt-2 text-center">
            <h1>TourPluse Highest rated </h1>
          </div>
          <div className="row py-5">
            <div className="info-adven col-md-3">
              <h2>Organized Adventures: What are they?</h2>
              <p>
                A multi-day travel experience seamlessly organized by a trusted
                operator—everything from logistics to meals to experiences to
                friendly guides. All you have to do is choose your adventure,
                pack your bags and go. Embark on a transformative organized
                adventure today. Choose from more than options via trusted
                operators on our platform.
              </p>
            </div>
            <div className="col-md-3">
              <div className="bg-white rounded-2">
                <a href="#">
                  <img
                    src="/img/one-adv.jpg"
                    alt="Groub-Adventures"
                    className="img-fluid rounded-2"
                  />
                  <h3 className="fs-2 ps-2 pt-3 text-dark">Group Adventures</h3>
                  <p className="fs-3 ps-2 text-dark">
                    Join a group and forge lifelong friendships.
                  </p>
                </a>
                <a href="#" className="ps-2">
                  Explore
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white rounded-2">
                <a href="#">
                  <img
                    src="/img/tow-adv.jpg"
                    alt="Private-Adventures"
                    className="img-fluid rounded-2 text-decoration-none"
                  />
                  <h3 className="fs-2 ps-2 pt-3 text-dark">
                    Private Adventures
                  </h3>
                  <p className="fs-3 ps-2 text-dark">
                    Travel exclusively with your own group.
                  </p>
                </a>
                <a href="#" className="ps-2">
                  Explore
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white rounded-2">
                <a href="#">
                  <img
                    src="/img/tree-adv.jpg"
                    alt="Personalized-Adventures"
                    className="img-fluid rounded-2"
                  />
                  <h3 className="fs-2 ps-2 pt-3 text-dark">
                    Personalized Adventures
                  </h3>
                  <p className="fs-3 ps-2 text-dark">
                    Customize an existing itinerary, or create your own.
                  </p>
                </a>
                <a href="#" className="ps-2">
                  Explore
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="Most-popular-experiences py-5">
        <div className="info-experiences text-center py-4">
          <h3 className="fs-2">Most popular experiences</h3>
          <span>EXPLORE A DIFFERENT WAY TO TRAVEL</span>
        </div>
        <div className="container">
          <div className="row py-2">
            <div className="col-md-3">
              <a href="#">
                <img
                  src="/img/experneice/diving.jpg"
                  alt="experience images"
                  className="img-fluid"
                />
              </a>
            </div>
            <div className="col-md-3">
              <a href="#">
                <img
                  src="/img/experneice/2-3-580x378.jpg"
                  alt="experience images"
                  className="img-fluid"
                />
              </a>
            </div>
            <div className="col-md-3">
              <a href="#">
                <img
                  src="/img/experneice/beautifuk-scenery.jpg"
                  alt="experience images"
                  className="img-fluid"
                />
              </a>
            </div>
            <div className="col-md-3">
              <a href="#">
                <img
                  src="/img/experneice/family-fun.jpg"
                  alt="experience images"
                  className="img-fluid"
                />
              </a>
            </div>
          </div>
          <div className="row py-2">
            <div className="col-md-3">
              <a href="#">
                <img
                  src="/img/experneice/old-colonial-towns.jpg"
                  alt="experience images"
                  className="img-fluid"
                />
              </a>
            </div>
            <div className="col-md-3">
              <a href="#">
                <img
                  src="/img/experneice/outdoor-adventure.jpg"
                  alt="experience images"
                  className="img-fluid"
                />
              </a>
            </div>
            <div className="col-md-3">
              <a href="#">
                <img
                  src="/img/experneice/snorkeling1.jpg"
                  alt="experience images"
                  className="img-fluid"
                />
              </a>
            </div>
            <div className="col-md-3">
              <a href="#">
                <img
                  src="/img/experneice/white-sands.jpg"
                  alt="experience images"
                  className="img-fluid"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
