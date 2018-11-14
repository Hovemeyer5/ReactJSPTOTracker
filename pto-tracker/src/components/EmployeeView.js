import React, { Component } from 'react';

import PtoGeneralInfo from './PtoGeneralInfo';
import PtoFormEntrySection from './PtoFormEntrySection';
import PtoEntries from './PtoEntries';


class EmployeeView extends Component {

  render() {
    return (
        <div>
            <PtoGeneralInfo />

            <PtoFormEntrySection />

            <PtoEntries />
        </div>
    );
  }
}

export default EmployeeView;