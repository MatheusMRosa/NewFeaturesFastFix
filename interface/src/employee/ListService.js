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

const DescriptionEstimate = ({estimateHours, estimateMinutes}) => {
    let minutesString = estimateMinutes;
    if (estimateMinutes < 10) {
        minutesString = '0' + minutesString
    }
    return (<div className="col-md-4" align="left">Estimativa de
        Tempo: {estimateHours}:{minutesString} hrs</div>);
};

const DescriptionDone = ({timeDoneHours, timeDoneMinutes}) => {
    let minutesString = timeDoneMinutes;
    if (timeDoneMinutes < 10) {
        minutesString = '0' + minutesString
    }
    return (<div className="col-md-4" align="left">Tempo
        gasto: {timeDoneHours}:{minutesString} hrs</div>);
};

class ListService extends Component {
    render() {
        const {thisEmployee} = this.props;
        return (
            <div style={{width: '100%'}} className="container">
                {thisEmployee.services.length < 1 ?
                    <div style={{marginTop: 20}}>Não foram encontrados serviços de {thisEmployee.name}</div>
                    :
                    thisEmployee.services.sort((a) => a.done).map((service, index) => (
                        <div key={index}>
                            {(!service.done) ?
                                <div className="row container sizeContainer">
                                    <DescriptionService {...service} />
                                    <DescriptionEstimate {...service} />
                                    <div align="right" className="col align-self-end">
                                        <img src={doneService} className="imgP imgPointer" data-toggle="modal"
                                             data-target={"#" + service._id} alt=""/>
                                        <span className="span spanA font-weight-bold">Finalizar Serviço</span>
                                    </div>
                                </div>
                                : service.delayed ?
                                    <div className="row container sizeContainer">
                                        <DescriptionService {...service} />
                                        <DescriptionDone {...service} />
                                        <div align="right" className="col align-self-end dropleft">
                                            <img src={warningService} alt=""
                                                 className="imgC imgP dropdown-toggle imgPointer" id={service._id}
                                                 data-toggle="dropdown" aria-haspopup="true"/>
                                            <div className="dropdown">
                                                <div className="dropdown-menu" aria-labelledby={service._id}>
                                                    <div className="dropdown-item">Motivo do Atraso</div>
                                                    <div className="dropdown-divider"/>
                                                    <p style={{padding: 20}}>{service.reasonDelay}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="row container sizeContainer">
                                        <DescriptionService {...service} />
                                        <DescriptionDone {...service} />
                                        <div align="right" className="col align-self-end">
                                            <img src={checkService} alt="" className="imgC"/>
                                        </div>
                                    </div>
                            }
                            <div className="modal fade" id={service._id} tabIndex="-1" role="dialog"
                                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <ModalService thisService={service} thisEmployee={thisEmployee}/>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    showServiceOk: state.employees.showServiceOk,
    showOpened: state.employees.showOpened,
    showDelayed: state.employees.showDelayed
});

export default connect(mapStateToProps)(ListService);