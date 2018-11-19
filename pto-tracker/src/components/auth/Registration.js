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
        passwordCheck: "",
        errors: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordCheckChange = this.handlePasswordCheckChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 
  
  handlePasswordCheckChange(event){
    if(this.state.errors.length > 0){
      let state = this.state;
      state[event.target.id] = event.target.value;
      this.validate(state);
    }
  
    this.setState({[event.target.id]: event.target.value });
  }
  handleChange(event){
    if(this.state.errors.length > 0){
      let state = this.state;
      state.registrant[event.target.id] = event.target.value;
      this.validate(this.state);
    }
    let registrant = this.state.registrant;
    registrant[event.target.id] = event.target.value
    this.setState({ registrant });
  }
  validateEmail(email) 
  {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  validatePassword(pw){
    // at least one number, one lowercase and one uppercase letter
    // at least eight characters
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return re.test(pw);
  }
  validate(state){
      let errors = [];
      if(!this.validateEmail(state.registrant.email)){
        errors.push({
          id: 1,
          message: "Invalid email format: Must be of format example@example.com"
        });
      }
      if(state.registrant.password !== state.passwordCheck){
        errors.push({
          id: 2,
          message: "Passwords must match."
        });
      }
      if(!this.validatePassword(state.registrant.password)){
        errors.push({
          id: 3,
          message: "Password must be contain one number, one lowercase letter, one upper case letter, and be a minimum of 8 characters long."
        });
      }
    this.setState({errors});
    return errors.length === 0;
  }
  handleSubmit(event) {
    event.preventDefault();
    
    if(!this.validate(this.state)){
      return;
    }
    
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
  registrationFailed(){
    if(this.props.registrationFailed){
      return <p className="red">{this.props.registrationFailed}</p>;
    }
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
