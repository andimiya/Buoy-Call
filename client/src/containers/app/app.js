import React, { Component } from 'react';
import NewUser from '../../components/NewUser.js';
import Checkout from '../../components/stripe-checkout';
import users from '../../reducers/';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { addUser } from '../../actions';
import { addUserToState } from '../../actions';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">

        <div className="App-header">
          <h2>WATER WORLD</h2>
        </div>
       <div className="stripe">
        <Checkout />
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
