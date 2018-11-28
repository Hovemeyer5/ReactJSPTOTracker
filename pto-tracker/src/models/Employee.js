import User from './User';

let Employee = function (employee = {}) {
    User.call(this, employee);
    this.rollover = employee.rollover;
    this.accrualRate = employee.accuralRate;
    this.entries = employee.entries;
    this.requests = employee.requests;
}

export default Employee;