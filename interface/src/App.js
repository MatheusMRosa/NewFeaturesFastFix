import React, {Component} from 'react';
import './App.css';
import RegisterEmployee from './employee/RegisterEmployee';
import ListEmployee from './employee/ListEmployee';
import {addEmployee, featchEmployee} from './employee/actionsEmployee';
import {featchUser} from './user/login';

class App extends Component {
    constructor(props){
        super(props);
        this.list = undefined;
        this.state={
            employees:[]
        };
        this.updateList = this.updateList.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
    }

    componentDidMount(){
        this.updateList();
    }

    addEmployee(values){
        addEmployee(values).then((res, err) => {
            if (err) {
                console.log("Error: ", err)
            }else {
                this.updateList();
            }
        });
    }
    updateList(){
        featchEmployee().then((data) => {
            this.setState({
                employees: data
            });
        }).catch(err=>{
            console.log("Error: ", err)
        });
    }

    render() {
        return (
            <div className="App">
                <RegisterEmployee onSavePressed={this.addEmployee}/>
                <ListEmployee employees={this.state.employees}/>
                <div name={featchUser()}/>
            </div>
        );
    }
}

export default App;