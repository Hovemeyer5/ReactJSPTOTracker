import {combineReducers} from 'redux';

import authReducer from './auth';
import ptoEntryReducer from './ptoEntry';

const rootReducer =  combineReducers({auth: authReducer, pto: ptoEntryReducer});

export default rootReducer;