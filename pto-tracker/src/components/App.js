import React, { Component } from 'react';
import List from './List';
import Form from './Form';
import Header from './Header';
import PtoGeneralInfo from './PtoGeneralInfo';

class App extends Component {
  
  render() {
    return (
      <div className="container">
        <Header />

        <PtoGeneralInfo />

        <div className="row mt-2">
          <div className="col-md-12 ">
            <h2>Add a PTO Entry</h2>
            <Form />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-12">
            <h2>PTO Entries</h2>
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
