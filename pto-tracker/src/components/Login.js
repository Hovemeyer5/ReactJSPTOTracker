import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import User from '../models/User';
import { setUser } from '../reducers/actions';

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user))
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
    fetch('http://yahst.com/wt/ptotracker/api/login.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      }).then(response =>{
          if(response.status === 200){
            return response.json();
          }
          return {};
      }).then(user => {
        if(user.username){
          const validUser = new User(user);
          this.props.setUser(validUser);
          const userAsString = JSON.stringify(validUser.toJson());
          window.localStorage.setItem('u', userAsString);
        }
      });
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
