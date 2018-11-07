import React, { Component } from 'react';
import List from './List';

class PtoEntries extends Component {

    render(){
        return (
            <div>
                <div className="row mt-3">
                    <div className="col-md-12 ">
                        <h3>Pto Entries</h3>
                    </div>
                </div>
                <List/>
            </div>
        );
    }
}

export default PtoEntries;