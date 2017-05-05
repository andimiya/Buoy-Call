/*jshint esversion:6 */

import React from 'react';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Email: '',
      Password: ' ',
      attemptedLogin: false
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
      if(data){
        this.props.history.push('/')
      } else {
        console.log("great")
      }
    })
    .catch((err) => {
      this.setState({attemptedLogin: true})
    })
  }

  userLoggedIn(curUser){
    return new Promise(function(resolve,reject){
      function reqListener(){
        console.log("this", this)
        if(this.status !== 200){
          reject(this.response);
        } else {
          let results = JSON.parse(this.responseText);
          resolve(results);
        }
      }
      function errorListener(err){
        reject(err);
      }
      let oReq = new XMLHttpRequest();
      oReq.open('POST', '/api/users/login');
      oReq.setRequestHeader('Content-type',
        'application/json')
      oReq.addEventListener("load", reqListener)
      oReq.addEventListener("error", errorListener)
      oReq.send(JSON.stringify(curUser))
    })
  }

  render(){
    let message = null
    if(this.state.attemptedLogin){
      message = <p className="login-error">Invalid email or password</p>
    }
    return(
      <div id='login-container'>
        <h1>Log in to Account</h1>

      <form onSubmit={this.handleSubmit}>
        <input type='text' onChange={this.handleChangeEmail} placeholder="Email Address" name='Email' /><br/>
        <input type='password' onChange={this.handleChangePassword} placeholder="Password" name="Password" /><br/>
        {message}
        <input className="login-submit" type="submit" value="Log In" />
      </form>
      </div>
    )
  }
};

export default Login;
