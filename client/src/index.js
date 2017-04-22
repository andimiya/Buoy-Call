import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App.js';
import secret from './components/secret';
import NewUser from './components/NewUser'
import Nav from './components/Nav';
import Login from './components/Login';
import Confirmation from './components/Confirmation';
import Payment from './components/StripeCheckout';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import users from './reducers';
import ReduxThunk from 'redux-thunk';
import './index.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


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
        <Route exact path="/NewUser" component={NewUser} />
        <Route exact path="/Payment" component={Payment} />
        <Route exact path="/Confirmation" component={Confirmation} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
