import User from './User';

let Employee = function (employee = {}) {
    User.call(this, employee);
    this.rollover = employee.rollover || 0;
    this.accrualRate = employee.accrualRate || 0;
    this.entries = employee.entries || [];
    this.requests = employee.requests || [];
}

export default Employee;