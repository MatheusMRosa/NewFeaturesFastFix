import React from 'react';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import ReactDOM from 'react-dom';
import Login from './login/LoginScreen';
import userReducer from './user/userReducer'
import { loadingBarReducer, loadingBarMiddleware } from 'react-redux-loading-bar';
import { backError } from './user/actionsUser'
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);
// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet(/[.]*\/api\/login[.]*/).reply(200, {

});

const store = createStore(combineReducers({
    loadingBar: loadingBarReducer,
    user: userReducer,
}));

it('Action Test', (done) => {

    store.dispatch(backError());
    if (store.getState().user.error === 0) {
        done()
    } else {
        done("Erro ao chamar action")
    }
});
it('renders without crashing', () => {

    // Teste de Interfaces (separa depois do redux)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Login /></Provider>, div);
    // if(true){
    //
    // }
    ReactDOM.unmountComponentAtNode(div);
});
