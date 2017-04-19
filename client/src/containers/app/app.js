import React, { Component } from 'react';
import Users from '../../components/Users.js';
import NewUser from '../../components/NewUser.js';
import Menu from '../../components/Menu.js';
import Footer from '../../components/Footer.js';

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
        
        <div className="header">

          <div className="App-header">
            <h1>BUOYAHHHHHHH</h1>
          </div>

          <div className="menu">
          <Menu />
          </div>

        </div>

         <div className="newUser">
           <NewUser />
         </div>
         
         <div className="curUsers">
           <Users />
         </div>

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
