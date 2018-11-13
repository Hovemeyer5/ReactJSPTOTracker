import React, { Component } from 'react';


import Header from './Header';
import PtoGeneralInfo from './PtoGeneralInfo';
import PtoFormEntrySection from './PtoFormEntrySection';
import PtoEntries from './PtoEntries';

import store from '../store/store';
import {fetchPtoEntries } from '../reducers/actions';


class App extends Component {

  constructor(){
    super();
    store.dispatch(fetchPtoEntries());
  } 

  render() {
    return (
      <div className="container">
        <Header />

        <PtoGeneralInfo />

        <PtoFormEntrySection />

        <PtoEntries />
      </div>
    );
  }
}

export default App;
