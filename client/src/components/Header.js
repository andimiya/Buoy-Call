import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/buoycall_logotype.svg'; 
// console.log(Logo);
class Header extends React.Component{
  constructor(props) {
    super(props);
    
  }

  render(){
    return(
      <div className="Header">
      <Link to="/"><img src="./buoycall_icon.png" /></Link>
      </div>
    )
  }
}

export default Header;