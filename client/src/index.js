import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App.js';
import { Provider } from 'react-redux';
import Graph from './components/Graph'
import NewUser from './components/NewUser'
import Nav from './components/Nav';
import Login from './components/Login';
import Confirmation from './components/Confirmation';
import ConfirmationDonation from './components/ConfirmationDonation';
import Checkout from './components/StripeCheckout';
import Donate from './components/Donate';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import ErrorPage from './components/Error';
import ContactUs from './components/ContactUs';
import Faq from './components/Faq';
import { createStore, applyMiddleware } from 'redux';
import users from './reducers';
import ReduxThunk from 'redux-thunk';
import Logout from './components/Logout';
import ManageAccount from './components/ManageAccount';
import browserHistory from 'react-router';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './containers/App/App.css';

let store = createStore(
  users,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <div id="root-container">
        <Nav/>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/Graph" component={Graph} />
        <Route exact path="/newuser" component={NewUser} />
        <Route exact path="/donate" component={Donate} />
        <Route exact path="/adopt/:shark_id" component={Checkout} />
        <Route exact path="/confirmation" component={Confirmation} />
        <Route exact path="/confirmation-donation" component={ConfirmationDonation} />
        <Route exact path="/auth" component={ManageAccount} />
        <Route exact path="/AboutUs" component={AboutUs} />
        <Route exact path="/ContactUs" component={ContactUs} />
        <Route exact path="/Faq" component={Faq} />
        <Route exact path="/error" component={ErrorPage} />
        <Route exact path="/logout" component={Logout}/>
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
