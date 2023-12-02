import React from 'react'
import './footer.css'
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Footer() {
  return (
    <div>
      <footer className="footers py-5" id="hire-me">
        <div className="container">
          <div className="row align-items-center pb-4">
            <div className="col-md-4">
              <div className='text-center'>
              <p className="m-0 p-0 text-white">
                Contact Us<br/> Sameh <span className='text-danger'>+972 59-559-763</span><br/>  Gazal <span className='text-danger'>+972 59-523-0081</span><br/>
                Mo'tasem <span className='text-danger'>+972 56-867-6250</span>
              </p>
              </div>
              
            </div>
            <div className="images col-md-4 text-center py-5">
            <img
              src="/images/fulllogo_transparent_nobuffer.png"
              alt="logo"
              className="logo"
            />
            </div>
            <div className="col-md-4">
              <p className="m-0 p-0 text-end text-center">
                Made By <br />
                <span className="text-white">
                  <a
                    href="https://www.facebook.com/profile.php?id=100010760257745"
                    alt="link facebook"
                    target="_blank"
                  >
                  <FontAwesomeIcon icon={faFacebook} className='brand brand-face'/>
                    Sameh Issa
                  </a>
                  <br />
                  <a
                    href="https://www.facebook.com/ghazool.masri"
                    alt="link facebook"
                    target="_blank"
                  >
                                      <FontAwesomeIcon icon={faFacebook} className='brand brand-face'/>

                    Gazal Masri
                  </a>
                  <br />
                  <a
                    href="https://www.facebook.com/profile.php?id=100007870096834"
                    alt="link facebook"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faFacebook} className='brand brand-face'/>
                    Mo'tasem a
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
