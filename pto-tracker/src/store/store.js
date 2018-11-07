import { createStore } from 'redux';
import actionConstants from './actionConstants';

const defaultState = { 
    rollover: 37.5,
    accrualRate: (20 * 8)/12,
    projectedAccruedPTO: 20 * 8,
    holidays: 9*8,
    projectedPTO: (20 * 8) + 37.5 + (9* 8),
    entries: []
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