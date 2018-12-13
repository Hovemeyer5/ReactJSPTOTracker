let PtoEntry = function (ptoEntry) {
    this.id = ptoEntry.id;
    this.startDate = ptoEntry.start_date;
    this.endDate = ptoEntry.end_date;
    this.description = ptoEntry.description;
    this.debit = ptoEntry.debit * 1;
    this.credit = ptoEntry.credit * 1;
    this.earnedBalance = ptoEntry.earnedBalance ? ptoEntry.earnedBalance * 1 : 0;
    this.projectedBalance = ptoEntry.projectedBalanced ? ptoEntry.projectedBalanced * 1 : 0;
}

export default PtoEntry;