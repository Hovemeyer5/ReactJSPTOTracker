import uuidv1 from "uuid";

const defaultState = { 
    rollover: 38.82,
    accrualRate: (20 * 8)/12,
    entries: []
};

if(defaultState.rollover > 0){
    const initialPTOEntry = {
      id: uuidv1(),
      startDate: new Date('01/01/19').toLocaleDateString(),
      endDate: new Date('01/01/19').toLocaleDateString(),
      description: "2019 Initial Balance",
      used: 0.00,
      credit: defaultState.rollover
    }
    defaultState.entries.push(initialPTOEntry);
}
for(let i = 1; i <= 12; i++){
    let month = i < 10 ? "0" + i : i;
    const acrrualEntry = {
        id: uuidv1(),
        startDate: new Date(month + "/01/19").toLocaleDateString(),
        endDate: new Date(month + "/01/19").toLocaleDateString(),
        description: month + "/01/19 Acrrual",
        used: 0.00,
        credit: defaultState.accrualRate
      }
      defaultState.entries.push(acrrualEntry);
}

export default defaultState;