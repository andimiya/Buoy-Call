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

  componentDidMount(){
    this.xhrLoginCheck()
    .then((userData)=>{
      console.log(this.props)
      let user = JSON.parse(userData)
      this.props.onAddUser(user.id, user.firstName, user.lastName, user.email)
    })
    .catch(function(err){
      console.log("component will mount error",err)
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
    console.log("YAY", this.props.loggedInUser)
    if(this.props.loggedInUser){
      return(
        <div>
        <h3>hello {this.props.loggedInUser.firstName}!</h3>
        <form onSubmit={this.logOut}>
          <input type="submit" value="Log out"></input>
        </form>
        <ul>
          <li><Link to="/secret">secret route / only if youre logged in</Link></li>
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/login">Login Page</Link></li>
          <li><Link to="/NewUser">Create an Account</Link></li>
          <li><Link to="/Graph">Sample Graph!</Link></li>
          <li><Link to="/Payment">Adopt a Buoy/Shark With Ca$h Money</Link></li>
        </ul>
      </div>
      )
    } else {
      return(
        <div>
        <h3>hello you are not logged in!!</h3>
        <ul>
          <li><Link to="/secret">secret route / only if youre logged in</Link></li>
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/login">Login Page</Link></li>
          <li><Link to="/NewUser">Create an Account</Link></li>
          <li><Link to="/Graph">Sample Graph!</Link></li>
          <li><Link to="/Payment">Adopt a Buoy/Shark With Ca$h Money</Link></li>
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
  console.log("STATE", state)
  return {
    loggedInUser: state.loggedInUser
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(Nav)
