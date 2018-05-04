import React, {Component} from 'react';
import {connect} from 'react-redux';
import {alterStatusService, employeeDelay} from './actionsEmployee';
import $ from 'jquery';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import '../../node_modules/bootstrap/dist/js/bootstrap';
import '../config/CSS/listEmployee.css';

let textDelay = undefined;

class ServicesList extends Component {
    render() {
        return (
            <table style={{width: '100%'}}>
                <tbody>
                {this.props.thisEmployee.services.map((service, index) => (
                    <tr key={index}>
                        <td className="text-left">Descrição do Serviço: {service.descService}</td>
                        <td>Estimativa de Tempo: {service.estimate} hrs</td>
                        <td align="right">
                            {!service.done ?
                                <button type="button" className="btn btn-info" data-toggle="modal"
                                        data-target={"#" + service._id}>
                                    Finalizar Serviço
                                </button>
                                : service.delayed ?
                                    <div>Atrasado</div>
                                    :
                                    <div>Em dia</div>
                            }
                            <div className="modal fade" id={service._id} tabIndex="-1" role="dialog"
                                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Finalizar
                                                Serviço: {service.descService}</h5>
                                            <button type="button" className="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div>Tempo Gasto: <input type="time" onChange={(time) => {
                                                let times = time.target.value.split(":");
                                                let estimates = service.estimate.split(":");
                                                if (parseInt(times[0] * 60 + times[1], 0) - parseInt(estimates[0] * 60 + estimates[1], 0) > 0) {
                                                    this.props.employeeDelay(true)
                                                } else {
                                                    this.props.employeeDelay(false)
                                                }

                                            }}/></div>
                                            {this.props.delay ?
                                                <div className="form-group" align="left">
                                                    <label htmlFor="comment">Motivo do Atraso</label>
                                                    <textarea className="form-control" rows="5" onChange={(text) => {
                                                        textDelay = text.target.value
                                                    }}/>
                                                </div>
                                                :
                                                <div/>
                                            }
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                    data-dismiss="modal">Cancelar
                                            </button>
                                            <button type="button" className="btn btn-primary" onClick={() => {
                                                if (textDelay) {
                                                    this.props.alterStatusService(this.props.thisEmployee._id, service._id, {
                                                            done: true, delay: textDelay, delayed: true
                                                        }
                                                    );
                                                } else {
                                                    this.props.alterStatusService(this.props.thisEmployee._id, service._id, {
                                                        done: true,
                                                        delayed: false
                                                    });
                                                }
                                                $("#" + service._id).modal("hide");
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
    }
}

const mapStateToProps = (state) => ({
    delay: state.employees.delay,
});
const mapDispatchToProps = {
    alterStatusService: alterStatusService,
    employeeDelay: employeeDelay
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList);