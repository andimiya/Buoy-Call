import React, { Component } from 'react';
import NewUser from '../../components/NewUser.js';
import './app.css';
import { connect } from 'react-redux';
import { addUser } from '../../actions';

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

        <div className="newUser">
          <NewUser />
          </div>
       
       <div className="curUsers">
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
