import User from './User';
import PtoEntry from './PtoEntry';

let Employee = function (employee = {}) {

    User.call(this, employee);
    this.rollover = employee.rollover || 0;
    this.accrualRate = employee.accrualRate || 0;
    this.entries = employee.entries ? employee.entries.map(entry => new PtoEntry(entry)) : [];
    this.requests = employee.requests || [];

    this.calculateEntryBalances = calculateEntryBalances;
    this.getProjectedBalance = getProjectedBalance;
    this.entries.sort((a,b) => a.startDate > b.startDate  ? 1 : b.startDate  > a.startDate  ? -1 : 0);
    this.calculateEntryBalances();

    this.getEarnedBalance = function(){
        if(this.entries.length === 0){
            return 0;
        }
        let earnedBalance = 0;
        let today = new Date().getTime();
        let lastEntryBeforeToday = 0;
        lastEntryBeforeToday = this.entries
        .findIndex(entry => today > new Date(entry.endDate).getTime());
        if(lastEntryBeforeToday > 0){
            let pastEntries = this.entries.slice(0, lastEntryBeforeToday);
            earnedBalance = pastEntries.map(e => e.credit).reduce((t,c) => t+c);
        }
        return Math.round(earnedBalance*100)/100;
    }
    function getProjectedBalance(){
        if(this.entries.length === 0){
            return 0;
        }
        const projectedAccrual = this.entries
            .map(entry => entry.credit)
            .reduce((t, c) => t+c);

        const usedPTO = this.entries
            .map(entry => entry.debit)
            .reduce((t, d) => t+d);
        const projectBalance = projectedAccrual - usedPTO;
        return Math.round(projectBalance*100)/100;
    }
    function calculateEntryBalances(){
        let earnedBalance = 0;
        let projectedBalance = this.getProjectedBalance();
        this.entries.forEach(entry => {
            earnedBalance = entry.credit - entry.debit + earnedBalance;
            projectedBalance = projectedBalance - entry.debit;
            entry.earnedBalance = earnedBalance;
            entry.projectedBalance = projectedBalance;
        });
    }
}

export default Employee;