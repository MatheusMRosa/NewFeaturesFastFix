import React, {Component} from 'react';
import './App.css';
import LoginUser from './login/LoginScreen';
import RegisterEmployee from './employee/RegisterEmployee';
// import ListEmployee from './employee/ListEmployee';
import RegisterService from './employee/RegisterService';
import HomePageList from './employee/HomePageList';
// import RegisterUser from './user/RegisterUser';
// import {newEmployee, fetchEmployee} from './employee/actionsEmployee';
// import {newUser} from './user/actionsUser';
// import {verifyLogin} from './login/actionsLogin';
import { Route } from 'react-router'
import {connect} from 'react-redux';

class App extends Component {
    componentDidMount() {
        // this.props.fetchEmployee();
    }

    render() {
        return (
            <div className="App">
                <Route exact path="/" component={LoginUser}/>
                <Route path="/register" component={RegisterEmployee}/>
                <Route path="/list" component={HomePageList}/>
                <Route path="/registerService" component={RegisterService}/>
                {/*<LoginUser onSubmit={this.props.verifyLogin}/>*/}
                {/*<RegisterEmployee onSubmit={this.props.addEmployee}/>*/}
                {/*<ListEmployee/>*/}
                {/*<RegisterUser onSubmit={this.props.addUser}/>*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    logged: state.user.logged
});
// const mapDispatch = {
//     verifyLogin: verifyLogin,
//     addEmployee: newEmployee,
//     fetchEmployee: fetchEmployee,
//     addUser: newUser,
// };

export default connect(mapStateToProps)(App);
