import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    appName: state.appName
});

class App extends Component {
  
  render() {
    return (
      <div>
        { this.props.appName }
      </div>
    );
  }
}

export default connect(mapStateToProps, () => ({}))(App);
