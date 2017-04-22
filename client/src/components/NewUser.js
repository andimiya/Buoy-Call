import React from 'react';

class NewUser extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      FirstName: " ", 
      LastName: " ", 
      Email: " ", 
      Password: " "
    };
    this.handleChangeFirstName=this.handleChangeFirstName.bind(this);
    this.handleChangeLastName=this.handleChangeLastName.bind(this);
    this.handleChangeEmail=this.handleChangeEmail.bind(this);
    this.handleChangePassword=this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


    handleChangeFirstName(event){
      this.setState({
        FirstName: event.target.value
      })
    }

    handleChangeLastName(event){
      this.setState({
        LastName: event.target.value
      })
    }

    handleChangeEmail(event){
      this.setState({
        Email: event.target.value
      })
    }

    handleChangePassword(event){
      this.setState({
        Password: event.target.value
      })
    }

    handleSubmit(event){

      event.preventDefault();
      console.log('this.state', this.state);
      this.createNewUser({
        FirstName: this.state.FirstName, 
        LastName: this.state.LastName, 
        Email: this.state.Email,
        Password: this.state.Password
      })
    }

    createNewUser(newUser){
      let oReq = new XMLHttpRequest();
      oReq.open('POST', '/api/users');
      oReq.setRequestHeader('Content-type', 'application/json')
      oReq.send(JSON.stringify(newUser));
     }

    render(){
      return(
        <div className="MakeNewUser">
        <div className="redBuoy">
        <img src="../assets/red_buoy.svg" />
        </div>
          <h3>Make a new User</h3>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChangeFirstName} placeholder="First Name" name="firstName" /><br/>
            <input type="text" onChange={this.handleChangeLastName} placeholder="Last Name" name="lastName" /><br/>
            <input type="text" placeholder="Email Address"onChange={this.handleChangeEmail} name='email address' /><br/>
            <input type="password" placeholder="Password" onChange={this.handleChangePassword} name='password' /><br/>
            <input type="submit" value='Create New User' />
          </form>
        </div>
      )
    }
}

export default NewUser;