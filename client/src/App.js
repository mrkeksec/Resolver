import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Login from './components/Login';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Layout} />
        <Route path="/login" component={Login} />
      </Router>
    </Provider>
  );
}

export default App;
