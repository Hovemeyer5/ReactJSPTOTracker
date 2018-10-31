import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Header from './components/header';

const mapStateToProps = state => ({
    appName: state.appName
});

class App extends Component {
  
  render() {
    return (
      <div>
        <Header appName={this.props.appName} />
      </div>
    );
  }
}

export default connect(mapStateToProps, () => ({}))(App);
