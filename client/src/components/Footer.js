/* jshint esversion:6 */

import React from 'react';


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
          <li>Contact Us</li>
          <li>Manage Your Payments</li>
        </ul>
      </div>
      </div>
    )
  }
}

export default Footer;
