import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from "react-router-redux";
import {fetchEmployee} from './actionsEmployee';
import ServicesList from './ServicesList';
import FilterSituationService from './FilterSituationService';
import ShowItens from './ShowItens';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import '../../node_modules/bootstrap/dist/js/bootstrap';
import '../config/CSS/listEmployee.css';
import '../config/CSS/serviceList.css';
import '../config/CSS/serviceList.css';
import addEmployee from '../config/images/addEmployee.png';

const Registered = ({name}) => <td colSpan={3} className="text-left col-lg-12">{name}</td>;

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
                        <th colSpan={2}>Nome do Funcionário</th>
                        <th>
                            <div align="right" style={{marginRight: 20}}>
                                <img src={addEmployee} alt="" className="imgADD imgP"
                                                    onClick={() => this.props.redirect('/register')}/>
                            </div>
                        </th>
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
                                        <ShowItens thisEmployee={employee}/>
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