import React, { Component } from 'react';

class Header extends Component {
   
   render() {
       return (
            <div className="row mt-5">
                <div className="col-md-12">
                    <h1 className="app-header">React PTO Tracker</h1>
                </div>
            </div>
        ); 
    }
};

export default Header;