import {combineReducers} from 'redux';

import authReducer from './auth';
import ptoEntryReducer from './ptoEntry';
import employeeReducer from './employee';

const rootReducer =  combineReducers(
    {
        auth: authReducer, 
        pto: ptoEntryReducer, 
        employee: employeeReducer
    });

export default rootReducer;