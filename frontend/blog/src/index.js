// src/index.js  (CRA ise)
import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'animate.css/animate.min.css';

import './app/index.css';

import { Provider } from 'react-redux';
import { store } from './app/store/store';

import { BrowserRouter } from 'react-router-dom';
import Router from './app/router';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
);
