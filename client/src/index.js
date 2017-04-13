import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app/app.js';
import './index.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import users from './reducers'; 
import ReduxThunk from 'redux-thunk';
import { createDevTools } from 'redux-devtools'

let store = createStore(
  users, 
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_(), 
  applyMiddleware(ReduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
);
