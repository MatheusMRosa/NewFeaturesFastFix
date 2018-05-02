import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from "react-router-redux";
import {alterStatusService} from './actionsEmployee';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import '../../node_modules/bootstrap/dist/js/bootstrap';
import '../config/CSS/listEmployee.css';

class ServicesList extends Component {
    render() {
        if (this.props.thisEmployee) {
            return (
                <table style={{width: '100%'}}>
                    <tbody>
                    {this.props.thisEmployee.services.map((service, index) => (
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
                                                <h5 className="modal-title" id="exampleModalLongTitle">Finalizar
                                                    Serviço</h5>
                                                <button type="button" className="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div>Tempo Gasto: <input type="time"/></div>
                                                {console.log("Validar se está no Prazo")}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        data-dismiss="modal">Cancelar
                                                </button>
                                                <button type="button" className="btn btn-primary" onClick={() => {
                                                    this.props.alterStatusService(this.props.thisEmployee._id, index,'"done":"true", "delay": "papsapapa"')
                                                }}>Finalizar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )
        } else {
            return (
                <div>List Undefined</div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    thisEmployee: state.employees.thisEmployee
});
const mapDispatchToProps = {
    alterStatusService: alterStatusService
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList);