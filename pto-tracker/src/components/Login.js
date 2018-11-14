import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { login } from '../reducers/actions';

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(login(username, password))
  };
};

const mapStateToProps = state => {
  return { user: state.user };
};

class ConnectedLogin extends Component {

  constructor(){
    super();
    this.state = {
        username: "",
        password: "",
        errors: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 
  handleChange(event){
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    /*
    if(!this.validateEntry()){
      return;
    }
    */
    this.props.login(this.state.username, this.state.password);
  }

  render() {
  
    if (this.props.user && this.props.user.is_admin === false) {
      return <Redirect to='/employee' />
    }
    if (this.props.user && this.props.user.is_admin === true) {
      return <Redirect to='/admin' />
    }

    return (
        <div className="login-form">
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                type="text"
                className="form-control"
                id="username"
                value={this.state.username}
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
                value={this.state.password}
                onChange={this.handleChange}
                required
                />
            </div>
            <button type="submit" className="submit-pto-entry btn btn-success btn-lg form-control">
                Login
            </button>
        </form>
        <div className={'alert alert-danger' + (this.state.errors.length > 0 ? '' : 'hide')}>
          {this.state.errors.map(error => (
            <p key={error.id} className="red">{error.message}</p>
          ))}
        </div>
      </div>
    );
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);
export default Login;
