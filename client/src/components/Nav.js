import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { addUserToState, logOutFromState } from '../actions';

class Nav extends Component {
  constructor(props, context){
    super(props, context);

    this.logOut = this.logOut.bind(this);
  }

  xhrLoginCheck(){
    return new Promise(function(resolve,reject){
      function reqListener(){
        resolve(this.responseText);
      }
      let oReq = new XMLHttpRequest();
      oReq.open('POST', '/api/users/checkLogin');
      oReq.setRequestHeader('Content-type',
        'application/json')
      oReq.addEventListener("load", reqListener)
      oReq.send()
    })
  }

  componentWillMount(){
    this.xhrLoginCheck()
    .then((userData)=>{
      let user = JSON.parse(userData)
      this.props.onAddUser(user.id, user.firstName, user.lastName, user.email)
    })
    .catch(function(err){
      console.log("Nav: User is not logged in")
    })
  }

  xhrLogOut(){
    return new Promise(function(resolve,reject){
      function reqListener(){
        resolve(this.responseText);
      }
      let oReq = new XMLHttpRequest();
      oReq.open('POST', '/api/users/logout');
      oReq.setRequestHeader('Content-type',
        'application/json')
      oReq.addEventListener("load", reqListener)
      oReq.send()
    })
  }

  logOut(event){
    event.preventDefault();
    this.xhrLogOut()
    .then(()=>{
      console.log("this.propS",this.props)
      this.props.onLogOut()
    })
  }

  render(){
    if(this.props.loggedInUser){
      return(
        <div className="nav-container">
        <div className="logo">
           <h1>
          <Link to="/">BuoyCall</Link>
          </h1>
        </div>
          <ul className="main-nav">
            <li><Link to="/Payment">Adopt</Link></li>
            <li><Link to="/Graph">Historical Charts</Link></li>
            <li><Link to="/">Non-Profit Support</Link></li>
          </ul>

          <div className="logged-in-note">
            <ul className="login-nav">
            <li>
              <h3>Welcome {this.props.loggedInUser.firstName}!</h3>
            </li>
            <li>My Account</li>
            <li>
              <a href="/logout">Logout</a>
            </li>
            </ul>
          </div>
      </div>
      )
    } else {
      return(
        <div className="nav-container">
        <div className="logo">
           <h1>
          <Link to="/">BuoyCall</Link>
          </h1>
        </div>
        <ul className="main-nav">
          <li><Link to="/Payment">Adopt</Link></li>
          <li><Link to="/Graph">Historical Charts</Link></li>
          <li><Link to="/">Non-Profit Support</Link></li>
        </ul>
        <ul className="login-nav">
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/NewUser">Create an Account</Link></li>
        </ul>

      </div>
      )
    }
  }
}


const mapDispatchToProps = {
  onAddUser: addUserToState,
  onLogOut: logOutFromState
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(Nav)
