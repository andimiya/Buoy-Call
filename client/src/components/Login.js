/*jshint esversion:6 */ 

import React from 'react'; 
import { Router, browserHistory } from 'react-router';
import createHistory from 'history/createBrowserHistory';

// const history = createHistory();
// const location = history.location;
// const unlisten = history.listen((location, action) => {
//   console.log("unlisten",action, location.pathname, location.state)
// })

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
        this.props.history.push('/secret')
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

export default Login;