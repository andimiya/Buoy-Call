import React from 'react';
import Router from 'react-router';


class EnsureLoggedInContainer extends React.Component{
  componentDidMount(){
    const { dispath, currentURL } = this.props

    if(!isLoggedIn){
      //set the curren url/path for the future redirect
      //then redirect(using react router)
      dispatch(setRedirectUrl(currentURL))
      browserHistory.replace("/login")
    }
  }

  render(){
    if(isLoggedIn){
      return this.props.children
    } else {
      return null
    }
  }
}

function mapStateToProps(state, ownProps){
  return {
    isLoggedIn: state.loggedIn,
    currentURL: ownProps.location.pathname
  }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)