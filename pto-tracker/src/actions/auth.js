import User from '../models/User';
import { apiRequest } from './common';

export const actions = {
    SET_USER: 'SET_USER',
    LOGOUT: 'LOGOUT',
    LOGIN_FAILED: 'LOGIN_FAILED'
};

export const setUser = (user) => ({type: actions.SET_USER, user});
export const logout = () => ({type: actions.LOGOUT});
export const loginFailed = () => ({type: actions.LOGIN_FAILED});


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