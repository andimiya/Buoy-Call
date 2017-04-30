import React from 'react';
import { connect } from 'react-redux';
import { addUserToState } from '../actions';

class ChangeEmail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      Email: ' '
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChangeEmail(event){
      this.setState({
        Email: event.target.value
      })
    }

    handleSubmit(event){
      event.preventDefault();
      console.log(this.state)
      this.editEmail( {
        Email: this.state.Email
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

   editEmail(editedUser){
      let oReq = new XMLHttpRequest();
      oReq.open('PUT', '/api/users/changeemail');
      oReq.setRequestHeader('Content-type', 'application/json')
      oReq.send(JSON.stringify(editedUser));
    }

      componentDidMount() {
        this.xhrLoginCheck()
        .then((userData)=>{
          let user = JSON.parse(userData)
          this.props.onAddUser(user.id, user.firstName, user.Email, user.email)
        })
        .catch(function(err){
          console.log("componenet will mount error", err)
        })
      }

    render(){
      return(
        <div className="editInfo">
        <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChangeEmail} placeholder={this.props.loggedInUser.email} />
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
    mapStateToProps, mapDispatchToProps)(ChangeEmail)
