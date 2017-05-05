import React from 'react';

class AboutUs extends React.Component {

  render() {
    return (
      <div className="AboutUs-Container">
        <h1>About Us</h1>
          <br />
            <p>
              We are Randy, Nao, Laylo, and Andrea.
              We love sharks. And buoys. And javascript.
            </p>
          <br />
          <p>
            <img height="300px" src={require('../assets/three-people2.png')} />
          </p>
          <br />
          <p>
            Photo Credit Laylo, who is taking the picture.
          </p>
      </div>
    )
  }
}

export default AboutUs;
