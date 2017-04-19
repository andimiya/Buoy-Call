/*jshint esversion:6 */

import React from 'react';

import './Menu.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    
  }



render(){
  return(
    <div className="fakeMenu">
      <ul>
        <li>Log In</li>
        <li>Charities</li>
        <li>FAQ</li>
      </ul>
    </div>
    )
  }

}

export default Menu;