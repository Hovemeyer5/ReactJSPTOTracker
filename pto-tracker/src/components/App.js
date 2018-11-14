import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from './Header';
import Login from './Login';
import EmployeeView from './EmployeeView';

import store from '../store/store';
import {fetchPtoEntries } from '../reducers/actions';


class App extends Component {

  constructor(){
    super();
    store.dispatch(fetchPtoEntries());
  } 

  render() {
    return (
      <Router>
        <div className="container">
          <Header />

          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/employee" component={EmployeeView} />
        </div>
      </Router>
    );
  }
}

export default App;
