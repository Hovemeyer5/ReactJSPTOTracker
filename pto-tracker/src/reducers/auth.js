import User from '../models/User';
import { actions as authactions } from '../actions/auth';

const defaultState = {
    user: null,
    loginFailed: false,
    registrationFailed: false,
    registrationSucceeded: false
};

let user = window.localStorage.getItem('u');
if(user){
    const validUser = new User(JSON.parse(user));
    defaultState.user = validUser;
}

const authReducer = function (state = defaultState, action) {
    switch(action.type) {
        case authactions.SET_USER:
            window.localStorage.setItem('u', JSON.stringify(action.user.toJson()));
            return { ...state, user: action.user, loading: false, loginFailed: false};
        case authactions.LOGOUT:
            window.localStorage.removeItem('u');
            return { ...state, user: null, loginFailed: false};
        case authactions.LOGIN_FAILED:
            return { ...state, loginFailed: true };
        case authactions.REGISTRATION_FAILED:
            return { ...state, registrationFailed: true};
        case authactions.REGISTRATION_SUCCEEDED:
            return { ...state, registrationSucceeded: true};
        default:
         return state;
    }
};

export default authReducer;