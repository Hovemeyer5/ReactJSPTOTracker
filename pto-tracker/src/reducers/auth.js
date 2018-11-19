import User from '../models/User';
import { actions } from './actions';

const defaultState = {
    user: null,
    loginFailed: false
};

let user = window.localStorage.getItem('u');
if(user){
    const validUser = new User(JSON.parse(user));
    defaultState.user = validUser;
}

const authReducer = function (state = defaultState, action) {
    switch(action.type) {
        case actions.SET_USER:
            window.localStorage.setItem('u', JSON.stringify(action.user.toJson()));
            return { ...state, user: action.user, loading: false, loginFailed: false};
        case actions.LOGOUT:
            window.localStorage.removeItem('u');
            return { ...state, user: null, loginFailed: false};
        case actions.LOGIN_FAILED:
            return { ...state, loginFailed: true };
        default:
         return state;
    }
};

export default authReducer;