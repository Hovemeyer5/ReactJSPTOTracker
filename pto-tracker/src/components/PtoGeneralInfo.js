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
   
    componentDidUpdate(){
        console.log(this.props.employee);
    }
    getEarnedBalance(entries){
        if(!entries || entries.length === 0){
            return 0;
        }
        let earnedBalance = 0;
        let today = new Date().getTime();
        let lastEntryBeforeToday = 0;
        lastEntryBeforeToday = entries
        .findIndex(entry => today > new Date(entry.endDate).getTime());
        if(lastEntryBeforeToday > 0){
            let pastEntries = entries.slice(0, lastEntryBeforeToday);
            earnedBalance = pastEntries.map(e => e.credit).reduce((t,c) => t+c);
        }
        return Math.round(earnedBalance*100)/100;
    }
    getProjectedBalance(employee){
        const projectedAccrual = employee.accrualRate * 12;
        let usedPTO = 0;
        if(employee.entries.length > 0){
            usedPTO = employee.entries.map(entry => entry.debit).reduce((total, entry) => {
                total = total || 0;
                return total + entry;
            });
        }
        const projectBalance = projectedAccrual - usedPTO;
        return Math.round(projectBalance*100)/100;
    }
    render() {
            const employee = this.props.employee;
            const earnedBalance = this.getEarnedBalance(employee.entries);
            const projectedBalance = this.getProjectedBalance(employee);
        
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
                            {earnedBalance}
                        </div>
                        <div className="col-md-4 last">
                            <label>Projected PTO: </label>
                            {projectedBalance}
                        </div>
                    </div>
            </div>
            
            ); 
        }
};

export default connect(mapStateToProps) (PtoGeneralInfo);