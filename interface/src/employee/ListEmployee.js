import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addServiceInEmployee} from './actionsEmployee';
// import RegisterService from './RegisterService';
import {fetchEmployee} from './actionsEmployee'
// import addNewService from '../config/images/add_new_service.jpg'
import {Field, reduxForm} from 'redux-form';
import {push} from "react-router-redux";


const Registered = ({name}) => <div>Nome: {name}</div>;

class ListEmployee extends Component {
    componentDidMount() {
        this.props.fetchEmployee();
    }
    render() {
        // const {addServiceInEmployee} = this.props;
        const {addServiceInEmployee} = this.props;
        const submit = (employee, values)=>{
            addServiceInEmployee(employee, values);
        };
        return (
            <div>{
                this.props.employees.map(
                    (employee, index) => {
                        if (!employee.services)
                            employee.services = [];
                        return (
                            <div key={index}>
                                <Registered {...employee}/>
                                <button onClick={submit(employee, values)}>Adicionar um novo Seriço</button>
                                <br/>
                                {employee.services.map((service, index) => (<div key={index}>Descrição do Serviço: {service.descService}</div>))}

                                {/*<RegisterService onSubmit={(values) => {*/}
                                    {/*addServiceInEmployee(employee, values)*/}
                                {/*}}/>*/}
                            </div>
                        )
                    })
            }
            </div>
        )
    }
}

const mapStoreToProps = (store) => ({
    employees: store.employees
});
const mapDispatchToProps = {
    addServiceInEmployee: addServiceInEmployee,
    fetchEmployee: fetchEmployee
};

export default connect(mapStoreToProps, mapDispatchToProps)(ListEmployee);