import defaultState from './defaultState';
import { actions } from './actions';

const reducer = function (state = defaultState, action) {
    switch(action.type) {
        case actions.ADD_PTO_ENTRY:
         return { ...state, entries: [...state.entries, action.payload] };
        case actions.SORT_PTO_ENTRIES:
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
        case actions.CALC_ENTRY_BALANCES:
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
        case actions.REQUEST_PTO_ENTRIES:
            return { ...state, loading: true};
        case actions.RECEIVED_PTO_ENTRIES:
            return { ...state, entries: action.payload, loading: false}
        default:
         return state;
    }
};

export default reducer;