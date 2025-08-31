//rfce
import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';

// ROUTER
import ProjectRouter from './ProjectRouter';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'jquery-ui/dist/themes/base/jquery-ui.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'animate.css/animate.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// jQuery + jQuery UI (UI init edeceğin component’te de import edebilirsin)
import $ from 'jquery';
window.$ = $;            // bazı eklentiler global jQuery bekler
window.jQuery = $;
import 'jquery-ui/dist/jquery-ui.min.js';

/////////////////////////////////////////////
// Dark Mode
import './styles/index.css';

// Dil Secenegi
import './internationalization/i18nlanguage';

// ROUTER
// BrowserRouter  http://localhost:3000/
// HashRouter     http://localhost:3000/#/
import { BrowserRouter } from 'react-router-dom';

// ROOT - DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// RENDER
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProjectRouter />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();


