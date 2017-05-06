import React from 'react';

class AboutUs extends React.Component {

  render() {
    return (
      <div id="home-page-container">
      <div className="AboutUs-Container">
        <h1 className="page-headers">About Us</h1>
          <br />
            <p>
              Marine ecosystems are essential for human survival, wealth and well-being, and are the Earth’s biggest life support system. As a leader in the global movement to protect and recover the integrity of vast ocean areas, Buoycall uses the latest technology in data collection to identify important ocean climate changes around the world and then advocates for their protection. We work with ocean-scientists, programmers, and other organizations to identify key cahnges in the sea and then help to fund solutions. Our unique effectiveness comes from our vision, expertise and our willingness to partner with others. Since starting as the vision of four people in 2017, Buoycall, a nonprofit organization, has become a tool in the effort to save our planet, the most pressing challenge of our time.
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
      </div>
    )
  }
}

export default AboutUs;
