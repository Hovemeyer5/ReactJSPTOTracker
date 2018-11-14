import React, { Component } from 'react';
import { Redirect } from "react-router-dom";


class Login extends Component {

  constructor(){
    super();
    this.state = {
        username: "",
        password: "",
        toEmployeeView: false,
        toAdminView: false,
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
      }).then(user =>{
        if(user.username){
          this.setState({toEmployeeView: true})
        }
        console.log(user);
      });
  }

  render() {
    if (this.state.toEmployeeView === true) {
      return <Redirect to='/employee' />
    }
    if (this.state.toAdminView === true) {
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

export default Login;
