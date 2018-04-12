import React, {Component} from 'react';
import {connect} from 'react-redux';
import addNewService from '../config/images/add_new_service.jpg'
import {addServiceInEnployee} from './actionsEmployee'
import RegisterService from './RegisterService'

const Registered = ({name}) => <div>Nome: {name}</div>;

class ListEmployee extends Component {
    render() {
        const {addServiceInEnployee} = this.props;
        return (
            <div>{
                this.props.employees.map(
                    (employee, index) => {
                        if (!employee.services)
                            employee.services = [];
                        return (
                            <div key={index}>
                                <Registered {...employee}/>
                                <br/>
                                {employee.services.map((service, index) => (<div key={index}>DescService: {service.descService}</div>))}
                                <RegisterService onSubmit={(values) => {
                                    addServiceInEnployee(employee, values)
                                }}/>
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
    addServiceInEnployee
};

export default connect(mapStoreToProps, mapDispatchToProps)(ListEmployee);