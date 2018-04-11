import React, {Component} from 'react';
import './App.css';
import RegisterEmployee from './employee/RegisterEmployee';
import ListEmployee from './employee/ListEmployee';
import {newEmployee, fetchEmployee} from './employee/actionsEmployee';

import {connect} from 'react-redux';

//import {featchUser} from './user/login

class App extends Component {
    constructor(props) {
        super(props);
        this.updateList = this.updateList.bind(this);
    }

    componentDidMount() {
        this.updateList();
    }


    updateList() {
        this.props.fetchEmployee();
    }

    render() {
        return (
            <div className="App">
                <RegisterEmployee onSubmit={this.props.addEmployee}/>
                <ListEmployee/>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({});
const mapDispatch = {
    addEmployee: newEmployee,
    fetchEmployee: fetchEmployee

};

export default connect(mapStateToProps, mapDispatch)(App);
