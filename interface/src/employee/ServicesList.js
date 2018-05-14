import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModalService from './ModalService';
import 'popper.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap';
import '../config/CSS/serviceList.css';
import checkService from '../config/images/checkService.png';
import warningService from '../config/images/warningService.png';
import doneService from '../config/images/doneService.png';

const DescriptionService = ({descService}) => <div className="text-left col-10 col-md-5">Descrição do
    Serviço: {descService}</div>;
const DescriptionEstimate = ({estimateHours, estimateMinutes}) => <div className="col-md-4">Estimativa de
    Tempo: {estimateHours}:{estimateMinutes} hrs</div>;

class ServicesList extends Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                {this.props.thisEmployee.services.map((service, index) => (
                    <div key={index}>
                        {(!service.done) && this.props.showOpened ?
                            <div className="row container sizeContainer">
                                <DescriptionService {...service} />
                                <DescriptionEstimate {...service} />
                                <div align="right" className="col align-self-end">
                                    <img src={doneService} className="imgP imgPointer" data-toggle="modal"
                                         data-target={"#" + service._id} alt=""/>
                                    <span className="span spanA font-weight-bold">Finalizar Serviço</span>
                                </div>
                            </div>
                            : service.delayed && this.props.showDelayed ?
                                <div className="row container sizeContainer">
                                    <DescriptionService {...service} />
                                    <DescriptionEstimate {...service} />
                                    <div align="right" className="col align-self-end dropdown">
                                        <img src={warningService} alt=""
                                             className="imgC imgP dropdown-toggle imgPointer" id={service._id}
                                             data-toggle="dropdown" aria-haspopup="true"/>
                                        <div className="dropdown">
                                            <div className="dropdown-menu" aria-labelledby={service._id}>
                                                <div className="dropdown-item">Motivo do Atraso</div>
                                                <div className="dropdown-divider"/>
                                                <div className="dropdown-item">{service.delay}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="row container sizeContainer">
                                    <DescriptionService {...service} />
                                    <DescriptionEstimate {...service} />
                                    <div align="right" className="col align-self-end">
                                        <img src={checkService} alt="" className="imgC"/>
                                    </div>
                                </div>
                        }
                        <div className="modal fade" id={service._id} tabIndex="-1" role="dialog"
                             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <ModalService thisService={service} thisEmployee={this.props.thisEmployee}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    showServiceOk: state.employees.showServiceOk,
    showOpened: state.employees.showOpened,
    showDelayed: state.employees.showDelayed
});

export default connect(mapStateToProps)(ServicesList);