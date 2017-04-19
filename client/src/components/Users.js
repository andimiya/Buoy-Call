/*jshint esversion:6 */ 

import React from 'react'; 

import './User.css';

class User extends React.Component {
  constructor(props){
    super(props); 
    this.state = {
      Email: '', 
      Password: ' '
    }
    this.handleChangeEmail=this.handleChangeEmail.bind(this);
    this.handleChangePassword=this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event){
    this.setState({
      Email : event.target.value
    })
  }

  handleChangePassword(event){
    this.setState({
      Password : event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    console.log('this.state', this.state)
    this.userLoggedIn({
      Email: this.state.Email, 
      Password: this.state.Password
    })
  }

  userLoggedIn(curUser){
    let oReq = new XMLHttpRequest();
    oReq.open('GET', '/api/users');
    oReq.setRequestHeader('Content-type', 
      'application/json')
    oReq.send(JSON.stringify(curUser));
  }



  render(){
    return(
      <div className='userLogIn'>
        <h3>Log in to Account</h3>  
      <form onSubmit={this.handleSubmit}>
      <input type='text' onChange={this.handleChangeEmail} placeholder="Email Address" name='Email' /><br/>
      <input type='password' onChange={this.handleChangePassword} placeholder="Password" name="Password" /><br/>
      <input type="submit" value="Log In" />
      </form>
      </div>
    )
  }
};

export default User;