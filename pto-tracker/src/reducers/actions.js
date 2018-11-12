import actionConstants from './actionConstants';
export const addPtoEntry = entry => ({ type: actionConstants.ADD_PTO_ENTRY, payload: entry });
export const sortPtoEntries = () => ( { type: actionConstants.SORT_PTO_ENTRIES, payload: null});
export const calcEntryBalances = () => ({ type: actionConstants.CALC_ENTRY_BALANCES, payload: null});