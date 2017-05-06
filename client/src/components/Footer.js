/* jshint esversion:6 */
import React from 'react';
import {Link} from 'react-router-dom';


class Footer extends React.Component{

  render(){
    return(
      <div id="footer-container">

      <div className="copyright">
        Copyright 2017 LarnYay, All Rights Reserved.
      </div>
      <div>
        <ul className="footer-links">
          <a target="_blank" href="https://www.facebook.com/Buoy-Call-1907513122824802/"><img width="2.8%" src={require('../assets/facebook.svg')} /></a>
          <a target="_blank" href="https://twitter.com/_buoycall"><img width="3.2%" src={require('../assets/twitter.svg')} /></a>
          <li>Non-Profit</li>
          <li>Privacy Policy</li>
          <li><Link to="/AboutUs">About Us</Link></li>
          <li><Link to="/ContactUs">Contact Us</Link></li>

        </ul>
      </div>
    </div>
    )
  }
}

export default Footer;
