/*jshint esversion:6 */

import React from 'react';

class Login extends React.Component {
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
    .then((data) => {
      console.log("Data",data)
      if(data){
        this.props.history.push('/')
      }
    })

  }

  userLoggedIn(curUser){
    return new Promise(function(resolve,reject){
      function reqListener(){
        let results = JSON.parse(this.responseText);
        resolve(results);
      }
      let oReq = new XMLHttpRequest();
      oReq.open('POST', '/api/users/login');
      oReq.setRequestHeader('Content-type',
        'application/json')
      oReq.addEventListener("load", reqListener)
      oReq.send(JSON.stringify(curUser))
    })
  }

  render(){
    return(
      <div id="home-page-container">
          <div id='login-container'>
            <h1>Log in to Account</h1>
              <div className="generalForm">
              <form onSubmit={this.handleSubmit}>
                <input type='text' onChange={this.handleChangeEmail} placeholder="Email Address" name='Email' />
                <input type='password' onChange={this.handleChangePassword} placeholder="Password" name="Password" /><br/>
                <input className="login-submit" type="submit" value="Log In" />
              </form>
            </div>
          </div>
        </div>
    )
  }
};

export default Login;
