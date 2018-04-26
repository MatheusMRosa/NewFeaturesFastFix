import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addServiceInEmployee} from './actionsEmployee';
import {fetchEmployee} from './actionsEmployee';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import '../../node_modules/bootstrap/dist/js/bootstrap';
import '../config/CSS/listEmployee.css';
import addNewService from '../config/images/add_new_service.jpg';


const Registered = ({name}) => <td className="text-left col-lg-12">{name}</td>;

const Services = (employee) => (
    <table style={{width: '100%'}}>
        <tbody>
        {employee.services.map((service, index) => (
            <tr key={index}>
                <td className="text-left">Descrição do Serviço: {service.descService}</td>
                <td>oi</td>
                <td>tchau</td>
            </tr>
        ))}
        </tbody>
    </table>
);

class ListEmployee extends Component {
    componentWillMount() {
        if (this.props.logged) {
            this.props.fetchEmployee();
        }
    }

    componentDidMount() {
        if (this.props.logged) {
            this.props.fetchEmployee();
        }
    }

    render() {
        return (
            <div className="container divTable">
                <table className="table table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th colSpan={3}>Nome do Funcionário</th>
                    </tr>
                    </thead>
                    {this.props.employees.map(
                        (employee, index) => {
                            if (!employee.services)
                                employee.services = [];
                            return (
                                <tbody key={index}>
                                <tr>
                                    <Registered {...employee}/>
                                    <td align="right">
                                        <button className="btn btn-secondary" data-toggle="collapse"
                                                data-target={"#" + employee._id}>Serviços
                                        </button>
                                    </td>
                                    <td align="right"><img src={addNewService} className="img" alt=""
                                                           onClick={() => console.log("OLA tudo bem")}/></td>
                                </tr>
                                <tr id={employee._id} className="collapse">
                                    <td colSpan={3}>
                                        <Services {...employee}/>
                                    </td>
                                </tr>
                                </tbody>
                            )
                        })}
                </table>
            </div>
        )
    }
}

const mapStoreToProps = (state) => ({
    employees: state.employees.filteredList,
    logged: state.user.logged
});
const mapDispatchToProps = {
    addServiceInEmployee: addServiceInEmployee,
    fetchEmployee: fetchEmployee
};

export default connect(mapStoreToProps, mapDispatchToProps)(ListEmployee);