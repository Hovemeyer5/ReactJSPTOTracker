import PtoEntry from '../models/PtoEntry';
import User from '../models/User';

export const actions = {
    ADD_PTO_ENTRY: 'ADD_PTO_ENTRY',
    SORT_PTO_ENTRIES: 'SORT_PTO_ENTRIES',
    CALC_ENTRY_BALANCES: 'CALC_ENTRY_BALANCES',
    API_REQUEST: 'API_REQUEST',
    RECEIVED_PTO_ENTRIES: 'RECEIVED_PTO_ENTIRES',
    SET_USER: 'SET_USER',
    LOGOUT: 'LOGOUT',
    LOGIN_FAILED: 'LOGIN_FAILED'
};


export const addPtoEntry = entry => ({ type: actions.ADD_PTO_ENTRY, payload: entry });
export const sortPtoEntries = () => ( { type: actions.SORT_PTO_ENTRIES});
export const calcEntryBalances = () => ({ type: actions.CALC_ENTRY_BALANCES});

export const apiRequest = () => ({ type: actions.API_REQUEST});
export const receivedPtoEntries = (payload) => ({ type: actions.RECEIVED_PTO_ENTRIES, payload: payload});

export const setUser = (user) => ({type: actions.SET_USER, user});
export const logout = () => ({type: actions.LOGOUT});
export const loginFailed = () => ({type: actions.LOGIN_FAILED});

export function fetchPtoEntries() {
    return function (dispatch) {
      dispatch(apiRequest());
      return fetch(`http://yahst.com/wt/ptotracker/api/initial.php`)
      .then(
         response => response.json(),
         error => console.log('An error occurred.', error),
        )
      .then((payload) => {
          payload = payload.map(ptoEntry => new PtoEntry(ptoEntry));
          dispatch(receivedPtoEntries(payload));
          dispatch(sortPtoEntries());
          dispatch(calcEntryBalances());
      },
     );
    };
   }

export function login(username, password){
    return function (dispatch) {
        dispatch(apiRequest());
        return fetch('http://yahst.com/wt/ptotracker/api/login.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    username: username,
                    password: password
                }
            )
        }).then(response =>{
            if(response.status === 200){
                return response.json();
            }
            dispatch(loginFailed());
            return {};
        }).then(user => {
            if(user.username){
                const validUser = new User(user);
                dispatch(setUser(validUser));
            }
        });
    }
}