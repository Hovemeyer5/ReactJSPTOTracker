import React, { Component } from 'react';
import EntryList from './EntryList';

class EntryContainer extends Component {

    render(){
        return (
            <div>
                <div className="row mt-3">
                    <div className="col-md-12 ">
                        <h3>Pto Entries</h3>
                    </div>
                </div>
                <EntryList entries={this.props.entries}/>
            </div>
        );
    }
}

export default EntryContainer;