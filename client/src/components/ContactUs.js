import React from 'react';


class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Message: ''
    }
    this.handleName = this.handleName.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
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
          <input type="text" name="Name" onChange={this.handleName}/>
            <br/><br/>
          <label>FROM</label>
            <br/>
          <input type="text" name="SendingTo" />
            <br/><br/>
          <label>SUBJECT</label>
            <br/>
          <input type="text" name="Subject"/>
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

        // <form>
        //   <div class="form-group">
        //     <label class="control-label " for="name">Name</label>
        //     <input class="form-control" id="name" name="name" type="text"/>
        //   </div>

        //   <div class="form-group">
        //     <label class="control-label requiredField" for="email">Email<span class="asteriskField">*</span></label>
        //     <input class="form-control" id="email" name="email" type="text"/>
        //   </div>

        //   <div class="form-group">
        //     <label class="control-label " for="subject">Subject</label>
        //     <input class="form-control" id="subject" name="subject" type="text"/>
        //   </div>

        //   <div class="form-group">
        //     <label class="control-label " for="message">Message</label>
        //     <textarea class="form-control" cols="40" id="message" name="message" rows="10"></textarea>
        //   </div>

        //   <div class="form-group">
        //     <button class="btn btn-primary " name="submit" type="submit">Submit</button>
        //   </div>
        // </form>
