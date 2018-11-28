import Employee from '../models/Employee';
import { actions as empActions } from '../actions/employee';

const defaultState = {
    employee: new Employee(),
    errors: []
};

const employeeReducer = function (state = defaultState, action) {
    switch(action.type) {
        case empActions.SET_EMPLOYEE:
            return { ...state, employee: action.employee};
        case empActions.GET_EMPLOYEE_FAILED:
            return { ...state, errors: action.errors};
        default:
         return state;
    }
};

export default employeeReducer;