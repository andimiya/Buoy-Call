import React, { Component } from 'react';
import NewUser from '../../components/NewUser.js';
import Checkout from '../../components/StripeCheckout';
import users from '../../reducers/';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { addUser } from '../../actions';
import { addUserToState } from '../../actions';
<<<<<<< HEAD
import Footer from '../../components/Footer.js';
=======
import './app.css';
>>>>>>> development

class App extends Component {
  constructor(props) {
    super(props);
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
