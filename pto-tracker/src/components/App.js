import React, { Component } from 'react';
import List from './List';
import Form from './Form';
import Header from './Header';

class App extends Component {
  
  render() {
    return (
      <div className="container">
        <Header />

        <div className="row">
          <div className="col-md-2">
            <label>Today: </label>
            {new Date().toLocaleDateString()}
          </div>
          <div className="col-md-2">
            <label>2018 Rollover: </label>
            37.5
          </div>
          <div className="col-md-2">
            <label>Accrual Rate: </label>
            13.33
          </div>
          <div className="col-md-2">
            <label>Projected Accrual: </label>
            88
          </div>
          <div className="col-md-2">
            <label>2019 Holidays: </label>
            72
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-12 ">
            <h2>Add a PTO Entry</h2>
            <Form />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-12">
            <h2>PTO Entries</h2>
            <List />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
