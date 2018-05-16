import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {reducer as formReducer} from 'redux-form';
import promiseMiddleware from 'redux-promise-middleware';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import employeeReducer from './employee/employeeReducer';
import userReducer from './user/userReducer';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import {Router, withRouter} from 'react-router';
import { loadingBarReducer, loadingBarMiddleware } from 'react-redux-loading-bar';

const history = createHistory();
const middleware = routerMiddleware(history);

const NonBlockApp = withRouter(App);

let store = applyMiddleware(promiseMiddleware(),loadingBarMiddleware({
    promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
}), middleware)(createStore)(
    combineReducers({
        employees: employeeReducer,
        user: userReducer,
        form: formReducer,
        router: routerReducer,
        loadingBar: loadingBarReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}>
    <Router history={history}>
        <NonBlockApp />
    </Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
