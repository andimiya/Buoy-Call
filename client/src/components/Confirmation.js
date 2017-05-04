import React from 'react';
import { connect } from 'react-redux';

class Confirmation extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    console.log(this.props.shark);
    if (!this.props.shark) {
      return null;
    }
    return(
      <div className="confirmation-page">
        <h1>You're awesome. Thank you for your contribution!</h1>
        <br />
        <p>You've named your shark <h2>{this.props.shark.name}</h2></p>
        <p>Come back often and look for your shark on the map</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shark: state.shark
  }
}

export default connect(mapStateToProps)(Confirmation);
