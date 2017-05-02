import React from 'react';
import { Router } from 'react-router';

class ContactUs extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="ContactUs-Container">
        <h1>Contact Us</h1>
<form>

  <div class="form-group">
    <label class="control-label " for="name">Name</label>
    <input class="form-control" id="name" name="name" type="text"/>
  </div>

  <div class="form-group">
    <label class="control-label requiredField" for="email">Email<span class="asteriskField">*</span></label>
    <input class="form-control" id="email" name="email" type="text"/>
  </div>

  <div class="form-group">
    <label class="control-label " for="subject">Subject</label>
    <input class="form-control" id="subject" name="subject" type="text"/>
  </div>

  <div class="form-group">
    <label class="control-label " for="message">Message</label>
    <textarea class="form-control" cols="40" id="message" name="message" rows="10"></textarea>
  </div>

  <div class="form-group">
    <button class="btn btn-primary " name="submit" type="submit">Submit</button>
  </div>

</form>
      </div>
    )
  }
}

export default ContactUs;