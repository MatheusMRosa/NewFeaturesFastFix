import React, {Component} from 'react';
import './App.css';
import LoginUser from './login/LoginScreen';
import RegisterEmployee from './employee/RegisterEmployee';
import RegisterService from './employee/RegisterService';
import HomePageList from './employee/HomePageList';
import GraphicService from './employee/graphicServiceByEmployee';
import PageNotFound from './login/PageNotFound';
import SideMenuBar from './config/SideMenuBar';
import {verifySession} from './login/actionsLogin';
import {Route} from 'react-router';
import {connect} from 'react-redux';

class App extends Component {
    componentDidMount() {
        this.props.verifySession()
    }

    render() {
        return (
            <div className="app">
                {this.props.logged ?
                    <SideMenuBar/>
                    :
                    null
                }
                <Route exact path="/" component={LoginUser}/>
                <Route path="/register" component={RegisterEmployee}/>
                <Route path="/list" component={HomePageList}/>
                <Route path="/registerService" component={RegisterService}/>
                <Route path="/notFound" component={PageNotFound}/>
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
