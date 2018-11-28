import React, { Component } from 'react';
import EntryListHeader from './EntryListHeader'

class EntryList extends Component {
    getRowClasses(entry){
        const today = new Date().getTime();
        let classes = '';
        if(entry.used > 0){
            classes += ' pto-entries-used-pto-row';
        }
        if(new Date(entry.endDate).getTime() > today){
            classes += ' pto-entries-future-pto-row';
        }
        return classes;
    }
    formatDecimal(value){
        return value ? Math.round(value*100)/100 : 0.00;
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <EntryListHeader />
                    {this.props.entries.map(entry => (
                        <div className={"row pto-entries-row " + this.getRowClasses(entry)} key={entry.id}>
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
                                {this.formatDecimal(entry.debit)}
                            </div>
                            <div className="col-md-1">
                                {this.formatDecimal(entry.credit)}
                            </div>
                            <div className="col-md-2">
                                {this.formatDecimal(entry.earnedBalance)}
                            </div>
                            <div className="col-md-2">
                                {this.formatDecimal(entry.projectedBalance)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default EntryList;
