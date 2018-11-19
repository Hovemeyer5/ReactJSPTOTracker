import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";


import PtoGeneralInfo from './PtoGeneralInfo';
import PtoFormEntrySection from './PtoFormEntrySection';
import PtoEntries from './PtoEntries';

import store from '../store/store';
import {fetchPtoEntries } from '../reducers/actions';


const mapStateToProps = state => {
  return { user: state.auth.user };
};

class EmployeeView extends Component {

  constructor(){
    super();
    store.dispatch(fetchPtoEntries());
  }

  render() {
    if (!this.props.user) {
      return <Redirect to='/login' />
    }

    return (
        <div>
            <PtoGeneralInfo />

            <PtoFormEntrySection />

            <PtoEntries />
        </div>
    );
  }
}

export default connect(mapStateToProps)(EmployeeView);