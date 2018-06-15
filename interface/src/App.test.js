import React from 'react';
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import ReactDOM from 'react-dom';
import Login from './login/LoginScreen';
import ListEmployee from './employee/ListEmployee';
import RegisterEmployee from './employee/RegisterEmployee';
import userReducer from './user/userReducer'
import {loadingBarReducer} from 'react-redux-loading-bar';
import {backError} from './user/actionsUser'
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

it('Action Test', (done) => {

    store.dispatch(backError());
    if (store.getState().user.error === 0) {
        done()
    } else {
        done("Erro ao chamar action")
    }
});

it('renders screen Login', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Login/></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
it('render a list employee', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><ListEmployee/></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
it('render a register employee', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><RegisterEmployee/></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});

