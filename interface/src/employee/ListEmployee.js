import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from "react-router-redux";
import {fetchEmployee, saveEmployeeForAddService, alterStatusService} from './actionsEmployee';
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
                <td>Estimativa de Tempo: {service.estimate} hrs</td>
                <td align="right">
                    <button type="button" className="btn btn-info" data-toggle="modal"
                            data-target={"#" + service._id}>
                        Finalizar Serviço
                    </button>
                    <div className="modal fade" id={service._id} tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Finalizar Serviço</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div>Tempo Gasto: <input type="time"/></div>
                                    {console.log("Validar se está no Prazo")}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={() => {console.log("Erro")}}>Finalizar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        ))}
        </tbody>
    </table>
);

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
                                                           onClick={() => {
                                                               this.props.saveEmployeeForAddService(employee);
                                                               this.props.redirect('./registerservice')
                                                           }}/></td>
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
    fetchEmployee: fetchEmployee,
    saveEmployeeForAddService: saveEmployeeForAddService,
    alterStatusService: alterStatusService,
    redirect: push
};

export default connect(mapStoreToProps, mapDispatchToProps)(ListEmployee);