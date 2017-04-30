import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App.js';
import { Provider } from 'react-redux';
import MapView from './components/MapView';
import Graph from './components/Graph'
import NewUser from './components/NewUser'
import Nav from './components/Nav';
import Login from './components/Login';
import Confirmation from './components/Confirmation';
import Payment from './components/StripeCheckout';
import { createStore, applyMiddleware } from 'redux';
import users from './reducers';
import ReduxThunk from 'redux-thunk';
import ManageAccount from './components/ManageAccount';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './index.css';

let store = createStore(
  users,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div id="root-container">
        <Nav />
      <div id="map-container">
        <MapView />
      </div>
      <div id="buoy-container">
        <div className="buoy-graph"></div>
        <Graph />
      </div>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/Graph" component={
          Graph} />
        <Route exact path="/newuser" component={NewUser} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/confirmation" component={Confirmation} />
        <Route exact path="/auth" component={ManageAccount} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
