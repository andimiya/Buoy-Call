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
              <label for="email"> Email Address: </label>
              <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"/>
            </div>
            <div class="form-group">
              <label class="control-label " for="message_id"> Message</label>
              <textarea class="form-control" id="message_id" name="message" rows="5"></textarea>
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