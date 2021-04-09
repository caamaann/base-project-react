import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// router
import { Router } from 'react-router';
import { history } from "./utils";

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
