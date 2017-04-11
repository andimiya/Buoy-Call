/*jshint esversion:6 */ 

import React form 'react'; 

class User extends Component {
  constructor(props){
    super(props); 
  }

  render(){
    return(
      <div className='userRegistration'>
        <h2>First Name: {this.props.firstName}</h2>
        <h2>Last Name: {this.props.lastName}</h2>
        <h2>Email Address: {this.props.email}</h2>
        <h2>Password: {this.props.password}</h2>
      </div>
    )
  }
};

export default User;