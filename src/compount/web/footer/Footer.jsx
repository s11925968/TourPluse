import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faInfoCircle, faCogs, faMobileAlt, faUsers, faBuilding, faUserFriends, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faAndroid, faApple, faAws, faFacebook, faGoogle, faLinkedinIn, faWindows } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className="footer ">
      <div className='container'>
      <div className="footer-logo"></div>
      <table>
        <thead>
          <tr>
            <th>About Tourpulse</th>
            <th>Tours</th>
            <th>Contect Us</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Blogs</td>
            <td>About social</td>
            <div className='icons-footers'>
            <td><FontAwesomeIcon icon={faFacebook} className="brand brand-face" /></td>
            </div>
          </tr>
          <tr>
            <td>TourPluse Highest rated</td>
            <td>Tours List</td>
            <div className='icons-footers'>
            <td> 
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="brand brand-linked fs-1"
              /></td>
            </div>
          </tr>
          <tr>
            <td>Most popular experiences</td>
            <td>add Tours</td>
            <div className='icons-footers'>
            <td><FontAwesomeIcon icon={faGoogle} className="brand brand-google" /></td>
            </div>
          </tr>
          <tr>
            <td></td>
            <td>Tours Agencies</td>
            <div className='icons-footers'>
            <td> 
              <FontAwesomeIcon
                    icon={faPhone}
                    className="brand brand-face"
                  /></td>
            </div>
          </tr>
          <tr>
            <td></td>
            <td>Hajj and Umrah Tours</td>
          </tr>
          <tr>
            <td></td>
            <td>WorldWide Tours!</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <hr />
      <div className="word-spacing-copyright">
        <div className="word-spacing">
          <a href="support">Support</a>
          <a href="docs">Docs</a>
          <a href="terms">Terms of Use</a>
          <a href="privacy">Privacy & terms</a>
        </div>
        <div className="copyright">©2023 Webestica All rights reserved.</div>
      </div>
      </div>
    </div>
  );
}
export default Footer;
