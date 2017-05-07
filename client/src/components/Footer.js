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
      <div className="right-footer">
        <ul className="footer-links">
          <li><a target="_blank" href="https://www.facebook.com/Buoy-Call-1907513122824802/"><img width="2.8%" src={require('../assets/facebook.svg')} /></a></li>
          <li><a target="_blank" href="https://twitter.com/_buoycall"><img width="3.2%" src={require('../assets/twitter.svg')} /></a></li>
          <li><Link to="/NewUser">Create an Account</Link></li>
          <li><Link to="/donate">Donate</Link></li>
          <li><Link to="/AboutUs">About Us</Link></li>
          <li><Link to="/ContactUs">Contact Us</Link></li>

        </ul>
      </div>
    </div>
    )
  }
}

export default Footer;
