import { createStore } from 'redux';
import actionConstants from './actionConstants';

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


const reducer = function (state = defaultState, action) {
    switch(action.type) {
        case actionConstants.ADD_PTO_ENTRY:
         return { ...state, entries: [...state.entries, action.payload] };
        case actionConstants.SORT_PTO_ENTRIES:
            state.entries.sort( (a,b) =>{
                let aStartDate = new Date(a.startDate).getTime();
                let bStartDate = new Date(b.startDate).getTime();
                let aEndDate = new Date(a.endDate).getTime();
                let bEndDate = new Date(b.endDate).getTime();

                if(aStartDate === bStartDate)
                    return bEndDate - aEndDate;
                
                return aStartDate - bStartDate ;
            });
            return state;
        case actionConstants.CALC_ENTRY_BALANCES:
            let earnedBalance = 0;
            let monthsInYear = 12;
            let projectedBalance = state.rollover + state.accrualRate * monthsInYear;
            state.entries.forEach(entry =>{
                earnedBalance = entry.credit - entry.used + earnedBalance;
                projectedBalance = projectedBalance - entry.used;
                entry.earnedBalance = earnedBalance;
                entry.projectedBalance = projectedBalance;
            });
            return state;
        default:
         return state;
    }
};

const store = createStore(reducer);


export default store;