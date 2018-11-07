import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { 
        rollover: state.rollover,
        accrualRate: state.accrualRate,
        projectedAccruedPTO: state.projectedAccruedPTO,
        holidays: state.holidays,
        projectedPTO: state.projectedPTO
    };
};

class PtoGeneralInfo extends Component {

   render() {
       return (
        <div className="row">
        <div className="col-md-2">
          <label>Today: </label>
          {new Date().toLocaleDateString()}
        </div>
        <div className="col-md-2">
          <label>2018 Rollover: </label>
          {this.props.rollover}
        </div>
        <div className="col-md-2">
          <label>Accrual Rate: </label>
          {Math.round(this.props.accrualRate*100)/100}
        </div>
        <div className="col-md-2">
          <label>2019 Holidays: </label>
          {this.props.holidays}
        </div>
        <div className="col-md-2">
          <label>Projected Accrued: </label>
          {this.props.projectedAccruedPTO}
        </div>
        <div className="col-md-2">
          <label>Projected PTO: </label>
          {this.props.projectedPTO}
        </div>
      </div>
        ); 
    }
};

export default connect(mapStateToProps) (PtoGeneralInfo);