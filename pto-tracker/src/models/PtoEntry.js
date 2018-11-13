let PtoEntry = function (ptoEntry) {

    this.id = ptoEntry.id;
    this.startDate = ptoEntry.startDate;
    this.endDate = ptoEntry.endDate;
    this.description = ptoEntry.description;
    this.used = ptoEntry.used;
    this.credit = ptoEntry.credit;
    this.earnedBalance = ptoEntry.earnedBalance ? ptoEntry.earnedBalance : 0;
    this.projectedBalance = ptoEntry.projectedBalanced ? ptoEntry.projectedBalanced : 0;
}

export default PtoEntry;