import React, { Component } from 'react';

class EntryListHeader extends Component {
    render() {
        return (
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
        );
    }
};

export default EntryListHeader;
