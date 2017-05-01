/* jshint esversion:6 */
import React from 'react';
import {Link} from 'react-router-dom';


class Footer extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="footer-container">
      <div>
        Copyright 2017 LarnYay, All Rights Reserved.
      </div>
      <div>
        <ul className="footer-links">
          <li>Non-Profit</li>
          <li>Privacy Policy</li>
          <li>About Us</li>
          <li><Link to="/ContactUs">Contact Us</Link></li>
          <li>Manage Your Payments</li>
        </ul>
      </div>
      </div>
    )
  }
}

export default Footer;
