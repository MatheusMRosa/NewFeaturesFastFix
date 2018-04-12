import React, {Component} from 'react';
import './App.css';
import RegisterEmployee from './employee/RegisterEmployee';
import ListEmployee from './employee/ListEmployee';
import RegisterUser from './user/RegisterUser';
import {newEmployee, fetchEmployee} from './employee/actionsEmployee';
import {newUser} from './user/actionsUser';

import {connect} from 'react-redux';

//import {featchUser} from './user/login

class App extends Component {
    componentDidMount() {
        this.props.fetchEmployee();
    }

    render() {
        return (
            <div className="App">
                <RegisterEmployee onSubmit={this.props.addEmployee}/>
                <ListEmployee/>
                <RegisterUser onSubmit={this.props.addUser}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});
const mapDispatch = {
    addEmployee: newEmployee,
    fetchEmployee: fetchEmployee,
    addUser: newUser
};

export default connect(mapStateToProps, mapDispatch)(App);
