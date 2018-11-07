import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { 
        entries: state.entries,
        rollover: state.rollover,
        accrualRate: state.accrualRate
     };
};

const ConnectedList = ({ entries, rollover, accrualRate }) => {
    const today = new Date().getTime();
    let earnedBalance = 0;
    let projectedBalance = rollover + accrualRate * 12;
    entries.sort( (a,b) =>{
        let aStartDate = new Date(a.startDate).getTime();
        let bStartDate = new Date(b.startDate).getTime();
        let aEndDate = new Date(a.endDate).getTime();
        let bEndDate = new Date(b.endDate).getTime();

        if(aStartDate === bStartDate)
            return bEndDate - aEndDate;
        
        return aStartDate - bStartDate ;
    });

    entries.forEach(entry =>{
        earnedBalance = entry.credit - entry.used + earnedBalance;
        projectedBalance = projectedBalance - entry.used;
        entry.earnedBalance = earnedBalance;
        entry.projectedBalance = projectedBalance;
    });

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="row pto-entries-header">
                    <div className="col-md-2">
                        Start Date
                    </div>
                    <div className="col-md-2">
                        End Date
                    </div>
                    <div className="col-md-2">
                        Description
                    </div>
                    <div className="col-md-1">
                        Used
                    </div>
                    <div className="col-md-1">
                        Credit
                    </div>
                    <div className="col-md-2">
                        Earned Balance
                    </div>
                    <div className="col-md-2">
                        Projected Balance
                    </div>
                </div>
                {entries.map(entry => (
                    <div className={"row pto-entries-row " + (entry.used > 0 ? ' pto-entries-used-pto-row' : '') 
                    + (new Date(entry.endDate).getTime() > today ? ' pto-entries-future-pto-row' : '')} key={entry.id}>
                        <div className="col-md-2">
                            {entry.startDate}
                        </div>
                        <div className="col-md-2">
                            {entry.endDate}
                        </div>
                        <div className="col-md-2">
                            {entry.description}
                        </div>
                        <div className="col-md-1">
                            {Math.round(entry.used*100)/100}
                        </div>
                        <div className="col-md-1">
                            {Math.round(entry.credit*100)/100}
                        </div>
                        <div className="col-md-2">
                            {Math.round(entry.earnedBalance*100)/100}
                        </div>
                        <div className="col-md-2">
                            {Math.round(entry.projectedBalance*100)/100}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const List = connect(mapStateToProps) (ConnectedList);

export default List;
