import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import 'hover.css/css/hover-min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'assets/scss/paper-dashboard.scss?v=1.3.0';
import 'assets/css/paper-dashboard.css';
import 'assets/demo/demo.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import MyRoutes from 'MyRoutes';

import allReducers from './redux/reducers';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:5050/api/';
const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <MyRoutes />
      </Switch>
      <Toaster />
    </BrowserRouter>
  </Provider>
);
