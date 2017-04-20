import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app/app.js';
import secret from './components/secret';
import NewUser from './components/NewUser'
import Nav from './components/nav'
import Login from './components/Login';
import Payment from './components/StripeCheckout';
import './index.css';
import auth from './lib/index.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import users from './reducers';
import ReduxThunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';


let store = createStore(
  users,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk)
);


// function checkAuth(){
//   let loggedIn = true;
//   xhrLoginCheck()
//   .then((data)=>{
//     if(data){
//       console.log(data)
//       console.log("good/true")
//       loggedIn = true
//     } else {
//       console.log("bad/false")
//       loggedIn = false;
//     }
//   })
//   return loggedIn
  //needs a boolean return value here though.. otherwise this function just returns undefined.
// }

// function xhrLoginCheck(){
//   return new Promise(function(resolve,reject){
//     function reqListener(){
//       resolve(JSON.parse(this.responseText));
//     }
//     let oReq = new XMLHttpRequest();
//     oReq.open('POST', '/api/users/checkLogin');
//     oReq.setRequestHeader('Content-type',
//       'application/json')
//     oReq.addEventListener("load", reqListener)
//     oReq.send()
//   })
// }


// const fakeAuth = {
//   isAuthenticated: true,
  //based on this value isAuthenticated, they can/cannot access the page that is within PrivateRoute tag
  // authenticate(cb) {
  //   this.isAuthenticated = true
  //   setTimeout(cb, 100) // fake async
  // },
  // signout(cb) {
  //   this.isAuthenticated = false
  //   setTimeout(cb, 100)
  // }
// }

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     fakeAuth.isAuthenticated ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

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
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
