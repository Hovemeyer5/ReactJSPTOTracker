import React, { Component } from 'react';
import { connect} from 'react-redux';

const mapStateToProps = state => {
    return { 
        rollover: state.pto.rollover,
        accrualRate: state.pto.accrualRate,
        entries: state.pto.entries
    };
};

class PtoGeneralInfo extends Component {
   
    render() {
        const employee = this.props.employee;
        
        return (
            <div>
                    <div className="row">
                        <div className="col-md-4">
                            <label>Today: </label>
                            {new Date().toLocaleDateString()}
                        </div>
                        <div className="col-md-4 middle">
                            <label>2018 Rollover: </label>
                            {employee.rollover}
                        </div>
                        <div className="col-md-4 last">
                            <label>Accrual Rate: </label>
                            {employee.accrualRate}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label>Projected Accrual: </label>
                            {employee.accrualRate * 12}
                        </div>
                        <div className="col-md-4 middle">
                            <label>Earned PTO: </label>
                            {employee.getEarnedBalance()}
                        </div>
                        <div className="col-md-4 last">
                            <label>Projected PTO: </label>
                            {employee.getProjectedBalance()}
                        </div>
                    </div>
            </div>
            
            ); 
        }
};

export default connect(mapStateToProps) (PtoGeneralInfo);