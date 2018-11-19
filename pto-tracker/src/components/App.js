import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Header from './Header';
import Login from './user_auth/Login';
import Registration from './user_auth/Registration';
import EmployeeView from './EmployeeView';


class App extends Component {
 

  render() {
    return (
      <Router>
        <div className="container">
          <Header />

          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
          <Route path="/employee" component={EmployeeView} />
        </div>
      </Router>
    );
  }
}

export default App;
