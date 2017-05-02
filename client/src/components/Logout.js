import React, {Component} from 'react';
import { connect } from 'react-redux';
import { logOutFromState } from '../actions';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  constructor(props){
    super(props);
    this.state = {

    }

    this.logOut = this.logOut.bind(this);
  }

  xhrLogOut(){
    return new Promise(function(resolve,reject){
      function reqListener(){
        resolve(this.responseText);
      }
      let oReq = new XMLHttpRequest();
      oReq.open('POST', '/api/users/logout');
      oReq.setRequestHeader('Content-type',
        'application/json')
      oReq.addEventListener("load", reqListener)
      oReq.send()
    })
  }

  logOut(event){
    this.xhrLogOut()
    .then(()=>{
      console.log("this.propS",this.props)
      this.props.onLogOut()
    })
  }

  componentWillMount(){
    this.logOut()
  }

  render(){
    return(
      <Redirect to={{
        pathname: '/'
      }}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser
  }
}

const mapDispatchToProps = {
  onLogOut: logOutFromState
}



export default connect(mapStateToProps, mapDispatchToProps)(Logout);