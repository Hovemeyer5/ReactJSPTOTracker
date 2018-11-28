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
        return fetch('http://yahst.com/wt/ptotracker/api/getEmployee.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id})
        }).then(response => {
            if(response.status === 200){
                response.json().then(employeeData => {
                    let employee = new Employee(employeeData);
                    dispatch(setEmployee(employee));
                });
            } else {
                response.json().then(errors => {
                    dispatch(getEmployeeFailed(errors));
                });
            }
            return {};
        });
    }
}


