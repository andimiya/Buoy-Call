import React from 'react';
import { connect } from 'react-redux';
import { addUserToState } from '../actions';
import { Login } from './Login';
import ChangeFirstName from './ChangeFirstName.js';
import ChangeLastName from './ChangeLastName.js';
import ChangePassword from './ChangePassword'
import ChangeEmail from './ChangeEmail'
import {
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Link
} from 'react-router-dom';

class ManageAccount extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        FirstName: " ", 
        LastName: " ", 
        Email: " ", 
        Password: " "
      };
  
    }

  

    xhrLoginCheck(){
      return new Promise(function(resolve, reject){
        function reqListener(){
          resolve(this.responseText);
        }
        let oReq = new XMLHttpRequest();
        oReq.open('POST', '/api/users/checkLogin');
        oReq.setRequestHeader('Content-Type', 'application/json')
        oReq.addEventListener('load', reqListener)
        oReq.send()
      })
    }


   


    componentDidMount() {
      this.xhrLoginCheck()
      .then((userData)=>{
        let user = JSON.parse(userData)
        this.props.onAddUser(user.id, user.firstName, user.lastName, user.email)
      })
      .catch(function(err){
        console.log("componenet wull mount error", err)
      })
    }

    render(){
      if(this.props.loggedInUser){
       return(
        <div className="edit">
            <h1>Manage your Account</h1>
            <div className="editForm">
            <h2>Edit Profile</h2>
            <ChangeFirstName />
            <ChangeLastName />
            <ChangeEmail />
            <ChangePassword />
            </div>

            <div className="donations">
            <h2> Previous Donations</h2>
            </div>
          </div>
          )
      }
      return(
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
    return{
      loggedInUser: state.loggedInUser
    }
  }
  export default connect(
    mapStateToProps, mapDispatchToProps)(ManageAccount)