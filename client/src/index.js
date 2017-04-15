import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app/app.js';
import secret from './components/secret';
import './index.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import users from './reducers'; 
import ReduxThunk from 'redux-thunk';
import { createDevTools } from 'redux-devtools'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

function loggedIn(){
  return false;
}

let store = createStore(
  users, 
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_(), 
  applyMiddleware(ReduxThunk)
);

const fakeAuth = {
  isAuthenticated: true,
  //based on this value isAuthenticated, they can/cannot access the page that is within PrivateRoute tag
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <PrivateRoute path="/secret" component={secret} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
