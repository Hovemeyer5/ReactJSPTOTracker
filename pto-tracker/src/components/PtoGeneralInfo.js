import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { 
        rollover: state.rollover,
        accrualRate: state.accrualRate,
        entries: state.entries
    };
};

class PtoGeneralInfo extends Component {

   render() {
        let earnedBalance = 0;
        let projectedBalance = this.props.rollover + this.props.accrualRate * 12;
        this.props.entries.sort( (a,b) =>{
            let aStartDate = new Date(a.startDate).getTime();
            let bStartDate = new Date(b.startDate).getTime();
            let aEndDate = new Date(a.endDate).getTime();
            let bEndDate = new Date(b.endDate).getTime();

            if(aStartDate === bStartDate)
                return bEndDate - aEndDate;
            
            return aStartDate - bStartDate ;
        });

        this.props.entries.forEach(entry =>{
            earnedBalance = entry.credit - entry.used + earnedBalance;
            projectedBalance = projectedBalance - entry.used;
            entry.earnedBalance = earnedBalance;
            entry.projectedBalance = projectedBalance;
        });
    
       const lastEntry = this.props.entries[this.props.entries.length-1];
       let lastEntryBeforeToday = this.props.entries[0];
       let today = new Date().getTime();
       this.props.entries.forEach(entry =>{
            if(today > new Date(entry.endDate).getTime()){
                lastEntryBeforeToday = entry;
            }
       });
       earnedBalance = Math.round(earnedBalance*100)/100;
       projectedBalance = Math.round(projectedBalance*100)/100;

       return (
           <div>
                <div className="row">
                    <div className="col-md-4">
                        <label>Today: </label>
                        {new Date().toLocaleDateString()}
                    </div>
                    <div className="col-md-4 middle">
                        <label>2018 Rollover: </label>
                        {this.props.rollover}
                    </div>
                    <div className="col-md-4 last">
                        <label>Accrual Rate: </label>
                        {Math.round(this.props.accrualRate*100)/100}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label>Projected Accrual: </label>
                        {this.props.accrualRate * 12}
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