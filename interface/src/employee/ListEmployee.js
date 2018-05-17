import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from "react-router-redux";
import {fetchEmployee} from './actionsEmployee';
import ServicesList from './ListService';
import FilterSituationService from './FilterSituationService';
import ShowItems from './ShowItems';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import '../../node_modules/bootstrap/dist/js/bootstrap';
import '../config/CSS/listEmployee.css';
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
                <table className="table table-hover table-light" id="accordion">
                    <thead className="thead-dark table-primary">
                    <tr>
                        <th colSpan={3} className="text-center">Nome do Funcionário</th>
                        <th>
                            <div align="right" style={{marginRight: 20}}>
                                <img src={addEmployee} alt="" className="imgADD imgP imgPointer"
                                     onClick={() => this.props.redirect('/register')}/>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    {this.props.employees.length < 1 ?
                        <tbody>
                        <tr>
                            <td colSpan={4}>
                                <div>Não foram encontrados funcionários</div>
                            </td>
                        </tr>
                        </tbody>
                        :
                        this.props.employees.map(
                            (employee, index) => {
                                if (!employee.services)
                                    employee.services = [];
                                return (
                                    <tbody key={index}>
                                    <tr data-toggle="collapse"
                                        data-target={"#" + employee._id} className="imgPointer">
                                        <Registered {...employee}/>
                                        <td><i className="fa fa-caret-down fa-2x" style={{color: 'black'}}/></td>
                                    </tr>
                                    <tr id={employee._id} className="collapse" data-parent="#accordion">
                                        <td colSpan={4}>
                                            <FilterSituationService thisEmployee={employee}/>
                                            <ServicesList thisEmployee={employee}/>
                                            <ShowItems thisEmployee={employee}/>
                                        </td>
                                    </tr>
                                    </tbody>
                                )
                            }
                        )
                    }
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