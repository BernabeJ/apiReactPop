import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';
import 'bootstrap/dist/css/bootstrap.css';

const accessToken = storage.get('auth')
setAuthorizationHeader(accessToken);


ReactDOM.render(
  // <React.StrictMode>
    <App isInitiallyLogged={!!accessToken }/>
  /* </React.StrictMode> */
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

