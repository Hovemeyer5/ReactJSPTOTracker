import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { entries: state.entries };
};

const ConnectedList = ({ entries }) => {
    const today = new Date().getTime();
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
