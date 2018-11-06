import { createStore } from 'redux';
import actionConstants from './actionConstants';

const defaultState = { 
    appName: 'PTO Tracker',
    articles: [],
};
const reducer = function (state = defaultState, action) {
    switch(action.type) {
        case actionConstants.ADD_ARTICLE:
         return { ...state, articles: [...state.articles, action.payload] };
        default:
         return state;
    }
};

const store = createStore(reducer);


export default store;