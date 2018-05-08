import React, {Component} from 'react';
import './App.css';
import LoginUser from './login/LoginScreen';
import RegisterEmployee from './employee/RegisterEmployee';
import RegisterService from './employee/RegisterService';
import HomePageList from './employee/HomePageList';
import GraphicService from './employee/graphicServiceByEmployee';
import ForbiddenUser from './login/UserForbidden';
import {verifySession} from './login/actionsLogin';
import {Route} from 'react-router';
import {connect} from 'react-redux';

class App extends Component {
    componentDidMount() {
      this.props.verifySession()
     }
     
    render() {
        return (
            <div className="App">
                <Route exact path="/" component={LoginUser}/>
                <Route path="/register" component={RegisterEmployee}/>
                <Route path="/list" component={HomePageList}/>
                <Route path="/registerService" component={RegisterService}/>
                <Route path="/forbidden" component={ForbiddenUser}/>
                <Route path="/graphic" component={GraphicService}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    logged: state.user.logged
});

const mapDispatchToProps = ({
    verifySession: verifySession
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
