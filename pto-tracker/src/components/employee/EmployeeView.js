import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";


import PtoGeneralInfo from '../PtoGeneralInfo';
import PtoFormEntrySection from '../PtoFormEntrySection';
import EntryContainer from './entry/EntryContainer';

import { getEmployee } from '../../actions/employee';

const mapDispatchToProps = dispatch => {
  return {
    getEmployee: (id) => dispatch(getEmployee(id))
  };
};
const mapStateToProps = state => {
  return { 
    user: state.auth.user,
    employee: state.employee.employee
   };
};

class EmployeeView extends Component {

  componentDidMount(){
    this.props.getEmployee(this.props.user.id);
  }

  render() {
    if (!this.props.user) {
      return <Redirect to='/login' />
    }

    return (
        <div>
            <PtoGeneralInfo employee={this.props.employee} />

            <PtoFormEntrySection />

            <EntryContainer entries={this.props.employee.entries}/>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeView);