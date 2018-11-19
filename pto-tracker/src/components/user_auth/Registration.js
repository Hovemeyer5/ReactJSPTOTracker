import React, { Component } from 'react';
import { connect } from "react-redux";

import Registrant from '../../models/Registrant';
//import { register } from '../../reducers/actions';

const mapDispatchToProps = dispatch => {
  return {
    //register: (registration) => dispatch(register(registration))
  };
};

const mapStateToProps = state => {
  return { 
    user: state.user,
    registrationFailed: state.registrationFailed
   };
};

class Registration extends Component {

  constructor(){
    super();
    this.state = {
        registrant: new Registrant(),
        errors: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordCheckChange = this.handlePasswordCheckChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 
  registrationFailed(){
    if(this.props.registrationFailed){
      return <p className="red">{this.props.registrationFailed}</p>;
    }
  }
  handlePasswordCheckChange(event){
    this.setState({[event.target.id]: event.target.value });
  }
  handleChange(event){
    let registrant = this.state.registrant;
    registrant[event.target.id] = event.target.value
    this.setState({ registrant });
  }
  handleSubmit(event) {
    event.preventDefault();
    /*
    if(!this.validateEntry()){
      return;
    }
    */
    //this.props.registration(this.state.registrant);
  }
  registeredSuccessful(){
      return (
          <div>
              <h2>Thank you for registering!</h2>
              <p> Please check your email and verify your account!</p>
          </div>
      );
  } 

  render() {
  
    if (this.props.registered === true) {
      return this.registeredSuccessful();
    }

    return (
        <div className="login-form">
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                type="text"
                className="form-control"
                id="first_name"
                value={this.state.registrant.first_name}
                onChange={this.handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                type="text"
                className="form-control"
                id="last_name"
                value={this.state.registrant.last_name}
                onChange={this.handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                type="text"
                className="form-control"
                id="email"
                value={this.state.registrant.email}
                onChange={this.handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                className="form-control"
                id="password"
                value={this.state.registrant.password}
                onChange={this.handleChange}
                required
                />
            </div>
            <div className="form-group">
                <input
                type="password"
                className="form-control"
                id="passwordCheck"
                value={this.state.passwordCheck}
                onChange={this.handlePasswordCheckChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="is_admin">Admin?</label>
                <input
                type="checkbox"
                className="form-control"
                id="is_admin"
                value={this.state.registrant.is_admin}
                onChange={this.handleChange}
                required
                />
            </div>
            <button type="submit" className="login-submit btn btn-success btn-lg">
                Register
            </button>
        </form>
        <div className={'login-errors alert alert-danger ' + (this.props.loginFailed || this.state.errors.length > 0 ? '' : 'hide')}>
          {this.state.errors.map(error => (
            <p key={error.id} className="red">{error.message}</p>
          ))}
          {this.registrationFailed()}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
