import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app/app.js';
import secret from './components/secret';
import './index.css';
import auth from './lib/index.js';
import { Provider } from 'react-redux';
import Graph from './components/Graph'
import NewUser from './components/NewUser'
import Nav from './components/nav';
import Login from './components/Login';
import Confirmation from './components/Confirmation';
import Payment from './components/StripeCheckout';
import { createStore, applyMiddleware } from 'redux';
import users from './reducers';
import ReduxThunk from 'redux-thunk';
import './index.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Footer from './components/Footer.js';
import Header from './components/Header.js';
import './index.css';

let store = createStore(
  users,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk)
);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Nav />
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/secret" component={secret} />
        <Route exact path="/Graph" component={
          Graph} />
        <Route exact path="/newuser" component={NewUser} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/confirmation" component={Confirmation} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
