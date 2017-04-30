import React from 'react';
import { connect } from 'react-redux';
import { addUserToState } from '../actions';

class ChangePassword extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      Password: ' '
    };
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChangePassword(event){
      this.setState({
        Password: event.target.value
      })
    }

    handleSubmit(event){
      event.preventDefault();
      console.log(this.state)
      this.editPassword( {
        Password: this.state.Password
      })
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

   editPassword(editedUser){
      let oReq = new XMLHttpRequest();
      oReq.open('PUT', '/api/users/changepassword');
      oReq.setRequestHeader('Content-type', 'application/json')
      oReq.send(JSON.stringify(editedUser));
    }

      componentDidMount() {
        this.xhrLoginCheck()
        .then((userData)=>{
          let user = JSON.parse(userData)
          this.props.onAddUser(user.id, user.firstName, user.Password, user.email)
        })
        .catch(function(err){
          console.log("componenet will mount error", err)
        })
      }

    render(){
      return(
        <div className="editInfo">
        <form onSubmit={this.handleSubmit}>
        <input type="password" onChange={this.handleChangePassword} placeholder="Update Password" />
        <input type="submit" vlaue='Change First Name' />
        </form>
        </div>
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
    mapStateToProps, mapDispatchToProps)(ChangePassword)
