import React from 'react';
import Logo from '../assets/buoycall_logotype.svg'; 
// console.log(Logo);
class Header extends React.Component{
  constructor(props) {
    super(props);
    
  }

  render(){
    return(
      <div className="Header">
      <img src="./buoycall_type.png" />
      </div>
    )
  }
}

export default Header;