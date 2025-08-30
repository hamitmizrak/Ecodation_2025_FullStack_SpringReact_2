// src/index.js  (CRA ise)
import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'animate.css/animate.min.css';

import './styles/index.css';

import { Provider } from 'react-redux';
import { store } from './store/store';

import { BrowserRouter } from 'react-router-dom';
import ProjectRouter from './ProjectRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ProjectRouter />
    </BrowserRouter>
  </Provider>
);
