import React from 'react';
import { connect } from 'react-redux';

class Confirmation extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="home-page-container">
      <div className="confirmation-page">
        <h1>You're awesome. Thank you for your contribution!</h1>
        <br />
        <p>You've named your shark</p>
        <br />
        <h1>{this.props.shark_name}</h1>
        <br />
        <p>Come back often and look for your shark on the map</p>
        <br />
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shark: state.shark,
    shark_name: state.shark_name
  }
}

export default connect(mapStateToProps)(Confirmation);
