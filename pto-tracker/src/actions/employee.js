import Employee from '../models/Employee';
import { apiRequest } from './common';

export const actions = {
    SET_EMPLOYEE: 'SET_EMPLOYEE',
    GET_EMPLOYEE_FAILED: 'GET_EMPLOYEE_FAILED'
};

export const setEmployee = (employee) => ({type: actions.SET_EMPLOYEE, employee});
export const getEmployeeFailed = (errors) => ({type: actions.GET_EMPLOYEE_FAILED, errors});

export function getEmployee(id){
    return function (dispatch) {
        dispatch(apiRequest());
        return fetch('http://yahst.com/wt/ptotracker/api/employee.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id})
        }).then(response => {
            debugger;
            if(response.status === 200){
                let employee = new Employee(response.json());
                dispatch(setEmployee(employee));
            } else {
                let errors = response.json();
                dispatch(getEmployeeFailed(errors));
            }
            return response.json();
        });
    }
}


