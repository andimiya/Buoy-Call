import React from 'react';
import { connect } from 'react-redux';
import { addUserToState } from '../actions';

class ChangeFirstName extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      FirstName: ' '
    };
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChangeFirstName(event){
      this.setState({
        FirstName: event.target.value
      })
    }

    handleSubmit(event){
      event.preventDefault();
      console.log(this.state)
      this.editFirstName( {
        FirstName: this.state.FirstName
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

   editFirstName(editedUser){
      let oReq = new XMLHttpRequest();
      oReq.open('PUT', '/api/users/changefirstname');
      oReq.setRequestHeader('Content-type', 'application/json')
      oReq.send(JSON.stringify(editedUser));
    }

      componentDidMount() {
        this.xhrLoginCheck()
        .then((userData)=>{
          let user = JSON.parse(userData)
          this.props.onAddUser(user.id, user.firstName, user.lastName, user.email)
        })
        .catch(function(err){
          console.log("componenet will mount error", err)
        })
      }

    render(){
      return(
        <div className="editInfo">
        <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChangeFirstName} placeholder={this.props.loggedInUser.firstName} />
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
    mapStateToProps, mapDispatchToProps)(ChangeFirstName)
