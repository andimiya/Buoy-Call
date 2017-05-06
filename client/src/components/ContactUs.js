import React from 'react';

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Message: '',
      Subject: ''
    }
    this.handleName = this.handleName.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleSubject = this.handleSubject.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleName(event){
    this.setState({
      Name: event.target.value
    });
  }

  handleMessage(event){
    this.setState({
      Message: event.target.value
    });
  }

  handleSubject(event){
    this.setState({
      Subject: event.target.value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    console.log('this.state', this.state);
    this.sendMail({
      Name: this.state.Name,
      Message: this.state.Message
    });
  }

  sendMail(mail){
    return new Promise(function(resolve, reject){
      function reqListener(){
        let results = JSON.parse(this.responseText);
        resolve(results);
      }
      let oReq = new XMLHttpRequest();
      oReq.open('POST', '/api/ContactUs');
      oReq.setRequestHeader('Content-type', 'application/json');
      oReq.send(JSON.stringify(mail));
    })
  }

  render() {
    return (
      <div className="ContactUs-Container">

        <h1>Contact Us</h1>
          <br/>
        <form id="myform" onSubmit="emailjs.sendForm('default_service', 'send_email', this); return false;" method="">
          <label>TO</label>
            <br/>
          <input type="text" name="Name" placeholder="buoycall.info@gmail.com" setVale="buoycall.info@gmail.com" />
            <br/><br/>
          <label>FROM</label>
            <br/>
          <input type="text" name="SendingTo" onChange={this.handleName}/>
            <br/><br/>
          <label>SUBJECT</label>
            <br/>
          <input type="text" name="Subject" onChange={this.handleSubject}/>
            <br/><br/>
          <label>MESSAGE</label>
            <br/>
          <input type="text" name="Message" onChange={this.handleMessage}/>
            <br/><br/>
          <button>Send</button>
        </form>
      </div>
    )
  }
}

export default ContactUs;