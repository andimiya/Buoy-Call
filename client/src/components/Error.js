import React from 'react';

class ErrorPage extends React.Component {

  render() {
    return (
      <div className="error-container">
        <br />
        <h1>Oh Noes! Sorry</h1>
          <br />
            <p>
              An error occured, please let us know about your error so we can fix it! Send us a <a href="mailto:buoycall.info@gmail.com">Buoy Call</a>
            </p>
          <br />
      </div>
    )
  }
}

export default ErrorPage;
