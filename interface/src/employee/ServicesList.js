import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alterStatusService, calculateDelay } from './actionsEmployee';
import $ from 'jquery';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import '../../node_modules/bootstrap/dist/js/bootstrap';
import checkService from '../config/images/checkService.png';
import warningService from '../config/images/warningService.png';
import doneService from '../config/images/doneService.png';
import '../config/CSS/serviceList.css';

let textDelay = undefined;
let timeHour = 0;
let timeMinute = 0;
let done = false;

const DescriptionService = ({ descService }) => <div className="text-left col-10 col-md-5">Descrição do
    Serviço: {descService}</div>;
const DescriptionEstimate = ({ estimateHours, estimateMinutes }) => <div className="col-md-4">Estimativa de
    Tempo: {estimateHours}:{estimateMinutes} hrs</div>;

class ServicesList extends Component {
    render() {
        return (
            <div style={{ width: '100%' }}>
                {this.props.thisEmployee.services.sort((a, b) => a.descService < b.descService ? -1 : a.descService > b.descService ? 1 : 0).map((service, index) => (
                    <div key={index}>
                        {(!service.done) && this.props.showOpened ?
                            <div className="row container" style={{ paddingTop: "20px" }}>
                                <DescriptionService {...service} />
                                <DescriptionEstimate {...service} />
                                <div align="right" className="col align-self-end">
                                    <img src={doneService} className="imgP" data-toggle="modal"
                                        data-target={"#" + service._id} alt="" />
                                    <span className="span spanA font-weight-bold">Finalizar Serviço</span>
                                </div>
                            </div>
                            : service.delayed && this.props.showDelayed ?
                                <div className="row container" style={{ paddingTop: "20px" }}>
                                    <DescriptionService {...service} />
                                    <DescriptionEstimate {...service} />
                                    <div align="right" className="col align-self-end">
                                        <img src={warningService} alt="" className="imgC" />
                                    </div>
                                </div>
                                : service.done && (!service.delayed) && this.props.showServiceOk ?
                                    <div className="row container" style={{ paddingTop: "20px" }}>
                                        <DescriptionService {...service} />
                                        <DescriptionEstimate {...service} />
                                        <div align="right" className="col align-self-end">
                                            <img src={checkService} alt="" className="imgC" />
                                        </div>
                                    </div>
                                    :
                                    <div />
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
                                        <h5 className="row" style={{ padding: "2%" }}>Tempo Gasto</h5>
                                        <div className="row" style={{ padding: "6%" }}>
                                            <input type="number" onChange={(time) => {
                                                timeHour = time.target.value;
                                            }} className="form-control" style={{ width: 140 }} />
                                            <div style={{ padding: 8 }}>Horas</div>
                                            <input type="number" onChange={(time) => {
                                                timeMinute = time.target.value;
                                            }} className="form-control" style={{ width: 140 }} />
                                            <div style={{ padding: 8 }}>Minutos</div>
                                        </div>
                                        <button onClick={() => {
                                            this.props.calculateDelay(parseInt(timeMinute, 0), parseInt(timeHour, 0), parseInt(service.estimateMinutes, 0), parseInt(service.estimateHours, 0));
                                            done = true
                                        }}>Validar Horário</button>
                                        {this.props.delay ?
                                            <div className="form-group" align="left">
                                                <label htmlFor="comment">Motivo do Atraso</label>
                                                <textarea className="form-control" rows="5" onChange={(text) => {
                                                    textDelay = text.target.value
                                                }} />
                                            </div>
                                            :
                                            <div>Serviço em Dia</div>
                                        }
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                            data-dismiss="modal">Cancelar
                                        </button>
                                        {done ?
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
                                                window.location.reload()
                                            }}>Finalizar
                                        </button>
                                            :
                                            <div />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    delay: state.employees.delay,
    showServiceOk: state.employees.showServiceOk,
    showOpened: state.employees.showOpened,
    showDelayed: state.employees.showDelayed
});
const mapDispatchToProps = {
    alterStatusService: alterStatusService,
    calculateDelay: calculateDelay
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList);