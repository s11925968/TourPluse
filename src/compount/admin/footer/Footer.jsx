import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faInfoCircle, faCogs, faMobileAlt, faUsers, faBuilding, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faAndroid, faApple, faAws, faWindows } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className="footer container">
      <div className="footer-logo"></div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Download</th>
            <th>About</th>
            <th>Resources</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Match way these she avoids seeing</td>
            <td><FontAwesomeIcon icon={faAws}/> Web Browser </td>
            <td>About social</td>
            <td>Join</td>
          </tr>
          <tr>
            <td>Death their fat off.</td>
            <td><FontAwesomeIcon icon={faWindows} /> Windows</td>
            <td>Security</td>
            <td>Help center</td>
          </tr>
          <tr>
            <td>Mobile experience</td>
            <td><FontAwesomeIcon icon={faMobileAlt} /> Phone</td>
            <td>Learn about our mobile app</td>
            <td>Download now</td>
          </tr>
          <tr>
            <td></td>
            <td><FontAwesomeIcon icon={faApple} /> Mack</td>
            <td>Customer Support</td>
            <td>Developers</td>
          </tr>
          <tr>
            <td></td>
            <td><FontAwesomeIcon icon={faAndroid} /> Android</td>
            <td>Partners</td>
            <td>Status</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>Careers-Join Us!</td>
            <td>Communities</td>
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
  );
}

export default Footer;
