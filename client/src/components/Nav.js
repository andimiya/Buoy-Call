import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { addUserToState, logOutFromState } from '../actions';

class Nav extends Component {
  constructor(props){
    super(props)

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
      console.log(this.props)
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
      this.props.onLogOut()
    })
  }

  render(){
    if(this.props.loggedInUser){
      return(
        <div className="nav">
        <ul>
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/auth">Manage Account</Link></li>
          <li><Link to="/Graph">Sample Graph!</Link></li>
          <li><Link to="/Payment">Adopt a Buoy/Shark With Ca$h Money</Link></li>
        </ul>

          <div className="loggedInSign">
            <h3>Welcome {this.props.loggedInUser.firstName}!</h3>
            <form onSubmit={this.logOut}>
              <input type="submit" value="Log out"></input>
            </form>
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
          <li><Link to="/">About Us</Link></li>
          <li><Link to="/">Non-Profit Support</Link></li>
        </ul>
        <ul className="login-nav">
          <li><Link to="/login">Login In</Link></li>
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
