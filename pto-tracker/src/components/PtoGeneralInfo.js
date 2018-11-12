import React, { Component } from 'react';
import { connect} from 'react-redux';
import { sortPtoEntries, calcEntryBalances } from '../reducers/actions';
import store from '../store/store';

const mapStateToProps = state => {
    return { 
        rollover: state.rollover,
        accrualRate: state.accrualRate,
        entries: state.entries
    };
};

class PtoGeneralInfo extends Component {
   constructor(){
        super();
        store.dispatch(sortPtoEntries());
        store.dispatch(calcEntryBalances());
   }
   getEarnedBalance(entries){
    let today = new Date().getTime();
    let lastEntryBeforeToday = entries[0];
    entries.forEach(entry =>{
         if(today > new Date(entry.endDate).getTime()){
             lastEntryBeforeToday = entry;
         }
    });
    return Math.round(lastEntryBeforeToday.earnedBalance*100)/100;
   }
   getProjectedBalance(entries){
    const lastEntry = entries[this.props.entries.length-1];
    return Math.round(lastEntry.projectedBalance*100)/100;
   }
   render() {
        const earnedBalance = this.getEarnedBalance(this.props.entries);
        const projectedBalance = this.getProjectedBalance(this.props.entries);

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