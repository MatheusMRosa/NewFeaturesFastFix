import React, {Component} from 'react';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {connect} from "react-redux";
import {alterStatusService, calculateDelay} from "./actionsEmployee";
import renderField from "./RenderField";
import $ from "jquery";
import checkService from '../config/images/checkService.png';

const selector = formValueSelector('finishService');
let textDelay = undefined;

const validate = values => {
    const errors = {};
    if (!values.hours) {
        errors.hours = 'Por Favor informe um horário'
    } else if (!values.minutes) {
        errors.minutes = 'Por Favor informe os minutos'
    } else if (values.hours < 0) {
        errors.hours = 'Por Favor insira um número positivo'
    } else if (values.minutes < 0) {
        errors.minutes = 'Por Favor insira um número positivo'
    } else if (values.minutes > 59) {
        errors.minutes = 'Por favor altere os minutos para menos de 60min'
    } else if (values.hours === 0 && values.minutes === 0) {
        errors.hours = 'Por favor insira um horário válido'
    }
    return errors
};

class ModalService extends Component {
    render() {
        const {handleSubmit, submitting} = this.props;
        const {hours, minutes} = this.props.values;
        const submit = values => {
            if (textDelay) {
                this.props.alterStatusService(this.props.thisEmployee._id, this.props.thisService._id, {
                        done: true, delay: textDelay, delayed: true
                    }
                );
            } else {
                this.props.alterStatusService(this.props.thisEmployee._id, this.props.thisService._id, {
                        done: true, delayed: false
                    }
                );
            }
            $("#" + this.props.thisService._id).modal("hide");
            window.location.reload()
        };
        const change = event => {
            this.props.calculateDelay(parseInt(minutes, 0), parseInt(hours, 0), parseInt(this.props.thisService.estimateMinutes, 0), parseInt(this.props.thisService.estimateHours, 0));
        };
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">
                        Finalizar Serviço: {this.props.thisService.descService}
                    </h5>
                    <button type="button" className="close" data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <h5 className="row" style={{padding: "2%"}}>Tempo Gasto</h5>
                    <div className="row" style={{padding: "6%"}}>
                        <Field component={renderField}
                               type="number"
                               name="hours"
                               onChange={change}/>
                        <div style={{padding: 8}}>Horas</div>
                        <Field component={renderField}
                               type="number"
                               name="minutes"
                               onChange={change}
                        />
                        <div style={{padding: 8}}>Minutos</div>
                    </div>
                    {this.props.delay ?
                        <div className="form-group" align="left">
                            <label htmlFor="comment">Motivo do Atraso</label>
                            <textarea className="form-control" rows="5" onChange={(text) => {
                                textDelay = text.target.value
                            }}/>
                        </div>
                        :
                        <img src={checkService} alt="" className="imgC" align="right"/>
                    }
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary"
                            data-dismiss="modal">Cancelar
                    </button>
                    <button type="button" disabled={submitting} className="btn btn-primary" onClick={handleSubmit(submit)}>Finalizar
                    </button>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return ({
        delay: state.employees.delay,
        values: selector(state, 'hours', 'minutes'),
    });
};

const mapDispatchToProps = {
    alterStatusService: alterStatusService,
    calculateDelay: calculateDelay
};

export default reduxForm({
    form: 'finishService',
    validate
})(connect(mapStateToProps, mapDispatchToProps)(ModalService));