import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "react-router-redux";
import { fetchEmployee, saveEmployeeForAddService, listThisEmployee } from './actionsEmployee';
import ServicesList from './servicesList';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import '../../node_modules/bootstrap/dist/js/bootstrap';
import '../config/CSS/listEmployee.css';
import addNewService from '../config/images/add_new_service.jpg';

const Registered = ({ name }) => <td className="text-left col-lg-12">{name}</td>;

class ListEmployee extends Component {

    shouldComponentUpdate(nextProps) {
        if (!this.props.logged && nextProps.logged) {
            this.props.fetchEmployee();
        }
        return true;
    }

    componentDidMount() {
        if (this.props.logged) {
            this.props.fetchEmployee();
        } else {
            this.props.redirect('/');
        }
    }

    render() {
        return (
            <div className="container divTable">
                <table className="table table-hover" id="accordion">
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
                                        <Registered {...employee} />
                                        <td align="right">
                                            <button className="btn btn-secondary" data-toggle="collapse"
                                                data-target={"#" + employee._id} onClick={() => {
                                                    this.props.listThisEmployee(employee)
                                                }}>Serviços
                                        </button>
                                        </td>
                                        <td align="right"><img src={addNewService} className="img" alt=""
                                            onClick={() => {
                                                this.props.saveEmployeeForAddService(employee);
                                                this.props.redirect('./registerservice')
                                            }} /></td>
                                    </tr>
                                    <tr id={employee._id} className="collapse" data-parent="#accordion">
                                        <td colSpan={3}>
                                            <ServicesList thisEmployee={employee}/>
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
    fetchEmployee: fetchEmployee,
    saveEmployeeForAddService: saveEmployeeForAddService,
    listThisEmployee: listThisEmployee,
    redirect: push
};

export default connect(mapStoreToProps, mapDispatchToProps)(ListEmployee);