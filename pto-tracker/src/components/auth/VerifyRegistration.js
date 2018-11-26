import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { verifyRegistration } from '../../actions/auth';

const mapDispatchToProps = dispatch => {
  return {
    verifyRegistration: (selector,validator) => dispatch(verifyRegistration(selector,validator))
  };
};

const mapStateToProps = state => {
  return { 
    registrationFailed: state.auth.registrationFailed,
    registrationSucceeded: state.auth.registrationSucceeded,
    loading: state.loading
   };
};

class VerifyRegistration extends Component {

  constructor(){
    super();
  } 

  componentDidMount(){
      this.props.verifyRegistration(this.props.match.params.selector, this.props.match.params.validator);
  }

  registrationFailed(){
      return <p className="red">Sorry, Registration Failed!</p>;
  }
  loading(){
      if(this.props.loading){
        return <p>Loading</p>;
      } 
  }
  render() {
    if (this.props.registrationSucceeded === true) {
        return <Redirect to='/login' />
    }
    if (this.props.registrationFailed === true) {
      return this.registrationFailed();
    }

    return (
        <div className="login-form">
           { this.loading() }
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyRegistration);
