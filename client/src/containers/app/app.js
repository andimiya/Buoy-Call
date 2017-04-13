import React, { Component } from 'react';
import Users from '../../components/Users.js';
import NewUser from '../../components/NewUser.js';
import users from '../../reducers/';

import './app.css';

import { createStore } from 'redux'; 
import { connect } from 'react-redux';
import { getAllUsers } from '../../lib';
import { addUser } from '../../actions';

let store = createStore(users);

class App extends Component {
  constructor(props) {
    super(props);
  }
  
 createNewUser(newUser){
  let oReq = new XMLHttpRequest();
  oReq.open('POST', '/api/users');
  oReq.setRequestHeader('Content-type', 'application/json')
  oReq.send(JSON.stringify(newUser));
 }

 componentWillMount(){
  getAllUsers()
  .then(data =>{
    data.forEach(users =>{ 
    this.props.getAllUsers(users.firstName, users.lastName, users.email, users.password);
    })
  })
 }
  render() {
    return (
      <div className="App">
        
        <div className="App-header">
          <h2>WATER WORLD</h2>
        </div>

        <div className="newUser">
          <NewUser createNewUser={this.createNewUser} />
          </div>
       
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('mapping state to props', state)
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getAllUsers:(firstName, lastName, email, password) =>{
      dispatch(addUser(firstName, lastName, email, password));
    }

  }
}


export default connect(
    mapStateToProps, 
    mapDispatchToProps)(App);
