import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { promiseMiddleware } from './middleware';

const defaultState = { 
    appName: 'PTO Tracker',
    timeEntries: null,
};
const reducer = function (state = defaultState, action) {
    switch(action.type) {
        case 'HOME_PAGE_LOADED':
         return { ...state, articles: action.payload.articles };
    }
    return state;
};
const store = createStore(reducer, applyMiddleware(promiseMiddleware));;

ReactDOM.render((
    <Provider store={store}>
        <App />
</Provider>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
