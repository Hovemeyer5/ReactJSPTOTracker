import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Header from './Header';
import Login from './auth/Login';
import Registration from './auth/Registration';
import EmployeeView from './EmployeeView';
import VerifyRegistration from './auth/VerifyRegistration';

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
          <Route path="/accountverification/:selector/:validator" component={VerifyRegistration} />
        </div>
      </Router>
    );
  }
}

export default App;
