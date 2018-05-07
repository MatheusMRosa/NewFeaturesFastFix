import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "react-router-redux";
import { fetchEmployee } from './actionsEmployee';
import ServicesList from './servicesList';
import FilterSituationService from './FilterSituationService';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import '../../node_modules/bootstrap/dist/js/bootstrap';
import '../config/CSS/listEmployee.css';
import '../config/CSS/serviceList.css';

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
                                    <tr data-toggle="collapse"
                                        data-target={"#" + employee._id}>
                                        <Registered {...employee} />
                                    </tr>
                                    <tr id={employee._id} className="collapse" data-parent="#accordion">
                                        <td colSpan={3}>
                                            <FilterSituationService thisEmployee={employee}/>
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
    redirect: push
};

export default connect(mapStoreToProps, mapDispatchToProps)(ListEmployee);