import React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import ReactDOM from 'react-dom';
import Login from './login/LoginScreen';
import MenuBar from './config/SideMenuBar';
import ListEmployee from './employee/ListEmployee';
import RegisterEmployee from './employee/RegisterEmployee';
import userReducer from './user/userReducer';
import {loadingBarReducer} from 'react-redux-loading-bar';
import {backError} from './user/actionsUser';
import {calculateDelay} from './employee/actionsEmployee';
import employeeReducer from "./employee/employeeReducer";

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

mock.onGet(/[.]*\/api\/login[.]*/).reply(200, {});

const store = createStore(combineReducers({
    loadingBar: loadingBarReducer,
    user: userReducer,
    employees: employeeReducer
}));

it('Action Test error', (done) => {
    store.dispatch(backError());
    if (store.getState().user.error === 0) {
        done()
    } else {
        done("Error in call action")
    }
});

it('Action Test delay', (done) => {
    store.dispatch(calculateDelay(0, 10, 0, 20)); // not delay
    let buffer = store.getState().employees.delay;
    store.dispatch(calculateDelay(0, 30, 0, 20)); // with delay
    if (!buffer && store.getState().employees.delay){
        done()
    } else {
        done("Failure")
    }
});

it('Render a Login Screen', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Login/></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
it('Render a Side Menu Bar', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><MenuBar/></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
it('Render a List Employee', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><ListEmployee/></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
it('Render a Register Employee', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><RegisterEmployee/></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
