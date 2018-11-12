export const actions = {
    ADD_PTO_ENTRY: 'ADD_PTO_ENTRY',
    SORT_PTO_ENTRIES: 'SORT_PTO_ENTRIES',
    CALC_ENTRY_BALANCES: 'CALC_ENTRY_BALANCES',
    REQUEST_PTO_ENTRIES: 'REQUEST_PTO_ENTRIES',
    RECEIVED_PTO_ENTRIES: 'RECEIVED_PTO_ENTIRES'
};

export const addPtoEntry = entry => ({ type: actions.ADD_PTO_ENTRY, payload: entry });
export const sortPtoEntries = () => ( { type: actions.SORT_PTO_ENTRIES});
export const calcEntryBalances = () => ({ type: actions.CALC_ENTRY_BALANCES});

export const reqestPtoEntries = () => ({ type: actions.REQUEST_PTO_ENTRIES});
export const receivedPtoEntries = (payload) => ({ type: actions.RECEIVED_PTO_ENTRIES, payload: payload});

export function fetchPtoEntries() {
    return function (dispatch) {
      dispatch(reqestPtoEntries());
      return fetch(`http://yahst.com/wt/ptotracker/api/initial.php`)
      .then(
         response => response.json(),
         error => console.log('An error occurred.', error),
        )
      .then((payload) => {
         dispatch(receivedPtoEntries(payload));
      },
     );
    };
   }