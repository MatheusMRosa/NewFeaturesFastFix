import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {reducer as formReducer} from 'redux-form'
import promiseMiddleware from 'redux-promise-middleware'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import employeeReducer from './employee/employeeReducer';

let store = applyMiddleware(promiseMiddleware())(createStore)(
    combineReducers({
        employees: employeeReducer,
        form: formReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
