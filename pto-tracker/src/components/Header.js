import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(logout())
    };
  };
  
const mapStateToProps = state => {
    return { user: state.auth.user };
};

class Header extends Component {
    
    log(user){
        console.log(user);
    }
    logoutButton(){
        if(this.props.user){
            return (<button onClick={this.props.logout}> Logout </button>);
        }
    }
    getUserFullName(){
        if(this.props.user){
            return this.props.user.first_name + " " + this.props.user.last_name;
        }
    }
   render() {

       return (
            <div className="row mt-5 app-header">
                <div className="col-md-4">
                </div>
                <div className="col-md-4">
                        <h1>
                        React PTO Tracker
                        </h1>
                </div>
                <div className="col-md-4">
                    {this.getUserFullName()}
                    {this.logoutButton()}
                </div>
            </div>
        ); 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);