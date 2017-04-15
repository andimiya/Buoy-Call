/*jshint esversion:6 */ 

import React from 'react'; 

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
    this.userLoggedIn({
      username: this.state.Email, 
      password: this.state.Password
    })
  }

  userLoggedIn(curUser){
    console.log("This should be working")
    let oReq = new XMLHttpRequest();
    oReq.open('POST', '/api/users/login');
    oReq.setRequestHeader('Content-type', 
      'application/json')
    oReq.send(JSON.stringify(curUser));
  }



  render(){
    return(
      <div className='userLogIn'>
        <h3>Log in to Account</h3>
      <form onSubmit={this.handleSubmit}>
      <input type='text' onChange={this.handleChangeEmail} placeholder="Email Address" name='Email' />
      <input type='password' onChange={this.handleChangePassword} placeholder="Password" name="Password" />
      <input type="submit" value="Log In" />
      </form>
      </div>
    )
  }
};

export default User;