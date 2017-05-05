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
      this.createNewUser({
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        Email: this.state.Email,
        Password: this.state.Password
      })
      .then((data) => {
        if(data){
          this.props.history.push('/login')
        }
      })
      .catch(err => {
        if(err){
          this.props.history.push('/error')
        }
      })
    }

    createNewUser(newUser){
      return new Promise(function(resolve, reject) {
        function reqListener(){
          let results = JSON.parse(this.responseText);
          resolve(results);
        }
        let oReq = new XMLHttpRequest();
        oReq.open('POST', '/api/users');
        oReq.setRequestHeader('Content-type', 'application/json')
        oReq.addEventListener('load', reqListener)
        oReq.send(JSON.stringify(newUser));
      })
    }

    render(){
      return(
        <div className="MakeNewUser">
          <h1>Create an Account</h1>
          <div className='description-text'>
          <p>Sign up today and lets save our ocean!</p>
          <p>Creating an account will allow you to make an adoption, and view all of your past contributions.</p>
          </div>
          <div className="generalForm">
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChangeFirstName} placeholder="First Name" name="firstName" />
            <input type="text" onChange={this.handleChangeLastName} placeholder="Last Name" name="lastName" /><br/>
            <input type="text" placeholder="Email Address"onChange={this.handleChangeEmail} name='email address' />
            <input type="password" placeholder="Password" onChange={this.handleChangePassword} name='password' /><br/>
            <input className="new-user-submit" type="submit" value='Create New User' />
          </form>
          </div>
        </div>
      )
    }
}

export default NewUser;
