import React from 'react';
class NewUser extends React.Component{
  constructor(props) {
    super(props);
    this.state = { FirstName: " ", LastName: " ", Email: " ", Password: " "};
    this.handleChangeFirstName=this.handleChangeFirstName.bind(this);
    this.handleChangeLastName=this.handleChangeLastName.bind(this);
    this.handleChangeEmail=this.handleChangeEmail.bind(this);
    this.handleChangePassword=this.handleChangePassword.bind(this);
  }


    handleChangeFirstName(event){
      this.setState({
        First_Name: event.target.value
      })
    }

    handleChangeLastName(event){
      this.setState({
        Last_Name: event.target.value
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
      console.log('this.props', this.props);
      event.preventDefault();
      this.props.createNewUser({
        First_Name: this.state.First_Name, 
        Last_Name: this.state.Last_Name, 
        Email: this.state.Email,
        Password: this.state.Password
      })
    }

    render(){
      return(
        <div className="MakeNewUser">
          <h3>Make a new User</h3>
          <input type="text" onChange={this.handleChangeFirstName} placeholder="First Name" name="firstName" />
          <input type="text" onChange={this.handleChangeLastName} placeholder="Last Name" name="lastName" />
          <input type="text" placeholder="Email Address"onChange={this.ChangeEmail} name='email address' />
          <input type="text" placeholder="Password" onChange={this.changePassword} name='password' />
          <input type="submit" value='Create New User' />
        </div>
      )
    }
}

export default NewUser;