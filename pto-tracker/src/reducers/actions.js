export const actions = {
    ADD_PTO_ENTRY: 'ADD_PTO_ENTRY',
    SORT_PTO_ENTRIES: 'SORT_PTO_ENTRIES',
    CALC_ENTRY_BALANCES: 'CALC_ENTRY_BALANCES'
};

export const addPtoEntry = entry => ({ type: actions.ADD_PTO_ENTRY, payload: entry });
export const sortPtoEntries = () => ( { type: actions.SORT_PTO_ENTRIES, payload: null});
export const calcEntryBalances = () => ({ type: actions.CALC_ENTRY_BALANCES, payload: null});