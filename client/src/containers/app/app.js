import React, { Component } from 'react';
import NewUser from '../../components/NewUser.js';
import './app.css';
import { connect } from 'react-redux';
import { addUser } from '../../actions';
import { addUserToState } from '../../actions';
import Footer from '../../components/Footer.js';

class App extends Component {
  constructor(props) {
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

  componentWillMount(){
    this.xhrLoginCheck()
    .then((userData)=>{
      let user = JSON.parse(userData)
      this.props.onAddUser(user.id, user.firstName, user.lastName, user.email)
    })
    .catch(function(err){
      console.log("component will mount error",err)
    })
  }
  
  render() {
    return (
      <div className="App">
        

       
       <div className="footer">
       <Footer />
       </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('mapping state to props', state)
  return {
    users: state.users,
    loggedInUser: state.loggedInUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onAddUser:(id, firstName, lastName, email) => {
      dispatch(addUserToState(id, firstName, lastName, email));
    },
    getAllUsers:(firstName, lastName, email, password) =>{
      dispatch(addUser(firstName, lastName, email, password));
    }

  }
}


export default connect(
    mapStateToProps, 
    mapDispatchToProps)(App);
