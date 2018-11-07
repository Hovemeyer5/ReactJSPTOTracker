import React, { Component } from 'react';


import Header from './Header';
import PtoGeneralInfo from './PtoGeneralInfo';
import PtoEntry from './PtoEntry';
import PtoEntries from './PtoEntries';


class App extends Component {
  
  render() {
    return (
      <div className="container">
        <Header />

        <PtoGeneralInfo />

        <PtoEntry />

        <PtoEntries />
      </div>
    );
  }
}

export default App;
