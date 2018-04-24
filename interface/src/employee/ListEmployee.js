import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addServiceInEmployee} from './actionsEmployee';
import {fetchEmployee} from './actionsEmployee';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import '../../node_modules/bootstrap/dist/js/bootstrap';
import '../config/CSS/listEmployee.css';


const Registered = ({name}) => <div className="text-center">Nome: {name}</div>;

class ListEmployee extends Component {
    componentDidMount() {
        this.props.fetchEmployee();
    }

    render() {
        // const {addServiceInEmployee} = this.props;
        // const {addServiceInEmployee} = this.props;
        // const submit = (employee, values) => {
        //     addServiceInEmployee(employee, values);
        // };
        return (
            <div className="custab">{
                this.props.employees.map(
                    (employee, index) => {
                        if (!employee.services)
                            employee.services = [];
                        return (
                            <div key={index}>
                                <Registered {...employee}/>
                                {/*<button onClick={submit(employee)}>Adicionar um novo Seriço</button>*/}
                                {employee.services.map((service, index) => (
                                    <div key={index}>Descrição do Serviço: {service.descService}</div>
                                ))}
                                {/*<RegisterService onSubmit={(values) => {*/}
                                {/*addServiceInEmployee(employee, values)*/}
                                {/*}}/>*/}
                            </div>
                        )
                    }
                )
            }
            </div>
        )
    }
}

const mapStoreToProps = (store) => ({
    employees: store.employees.filteredList
});
const mapDispatchToProps = {
    addServiceInEmployee: addServiceInEmployee,
    fetchEmployee: fetchEmployee
};

export default connect(mapStoreToProps, mapDispatchToProps)(ListEmployee);