import React, {Component} from 'react'
import { connect } from 'react-redux';
import { addUserToState } from '../actions';
import { Login } from './Login';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

class secret extends Component {
  constructor(props){
    super(props);
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

  render(){
    if(this.props.loggedInUser) {
      return (
        <div>
          <h1>this is a secret yo</h1>
          <p> secret</p>
        </div>
      )
    }
    return (
      <Redirect to={{
        pathname: '/login'
      }}/>
    )
  }
}

const mapDispatchToProps = {
  onAddUser: addUserToState
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(secret)