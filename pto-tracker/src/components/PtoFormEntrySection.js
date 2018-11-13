import React, { Component } from 'react';
import Form from './Form';

class PtoFormEntrySection extends Component {

    render(){
        return (
            <div>
                <div className="row mt-5">
                    <div className="col-md-12 ">
                        <h3>Add a PTO Entry</h3>
                    </div>
                </div>
                <Form />
            </div>
        );
    }
}

export default PtoFormEntrySection;