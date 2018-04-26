import React, {Component} from 'react';
import './App.css';
import LoginUser from './login/LoginScreen';
import RegisterEmployee from './employee/RegisterEmployee';
import RegisterService from './employee/RegisterService';
import HomePageList from './employee/HomePageList';
import ForbiddenUser from './login/UserForbidden';
import {Route} from 'react-router'
import {connect} from 'react-redux';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route exact path="/" component={LoginUser}/>
                <Route path="/register" component={RegisterEmployee}/>
                <Route path="/list" component={HomePageList}/>
                <Route path="/registerService" component={RegisterService}/>
                <Route path="/forbidden" component={ForbiddenUser}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    logged: state.user.logged
});

export default connect(mapStateToProps)(App);
