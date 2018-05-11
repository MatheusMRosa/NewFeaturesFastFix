import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {addServiceInEmployee} from './actionsEmployee';
import {connect} from "react-redux";
import {push} from "react-router-redux";
import Clock from 'react-live-clock';

const validate = values => {
    const errors = {};
    if (!values.descService) {
        errors.descService = 'Por Favor insira uma breve descrição sobre o Serviço';
    } else if (!values.estimateHours || !values.estimateMinutes) {
        errors.estimateHours = 'Por Favor informe um horário'
    } else if (values.estimateHours < 0) {
        errors.estimateHours = 'Por Favor insira um número positivo'
    } else if (values.estimateMinutes < 0) {
        errors.estimateMinutes = 'Por Favor insira um número positivo'
    } else if (values.estimateMinutes > 59) {
        errors.estimateMinutes = 'Por favor altere os minutos para menos de 60min'
    }
    return errors
};

const renderField = ({input, label, type, meta: {touched, error}}) => (
    <div>
        <input {...input} placeholder={label} type={type} className="form-control" style={{marginTop: 20}}/>
        {touched && (error && <div className="alert alert-danger" role="alert">{error}</div>)}
    </div>
);

class RegisterService extends Component {

    componentDidUpdate() {
        if (this.props.serviceAdded) {
            this.props.redirect('/');
        }
    }

    componentDidMount() {
        if (!this.props.employeeSelected) {
            this.props.redirect('/')
        }
    }

    render() {

        const {handleSubmit, addServiceInEmployee, submitting} = this.props;
        const submit = (values) => {
            if (!values.estimateHours){
                values.estimateHours = 0
            } else if (!values.estimateMinutes) {
                values.estimateMinutes = 0
            }
            addServiceInEmployee(this.props.employeeSelected, values);
            window.location.reload();
        };
        return (
            <div align="center">
                {this.props.employeeSelected ?
                    <div className="container card" style={{marginTop: 100, width: 500, height: 500}}>
                        <h5 className="card-title" style={{marginTop: 20}}>Novo serviço para o
                            funcionário {this.props.employeeSelected.name}</h5>
                        <Field component={renderField}
                               label="Descrição do Serviço"
                               type="text"
                               name="descService"/>
                        <div className="card-body">
                            <div className="row" align="center">
                                <div style={{marginTop: 20}}>Horário Atual:</div>
                                <div style={{marginTop: 20}}><Clock format={'HH:mm:ss'} ticking={true}/></div>
                            </div>
                            <div style={{marginTop: 20}}>Estimatima de conclusão:</div>
                            <div className="row">
                                <div style={{marginTop: 20}}>Horas:</div>
                                <Field component={renderField}
                                       placeholder="Tempo estimado"
                                       type="number"
                                       name="estimateHours"/>
                            </div>
                            <div className="row">
                                <div style={{marginTop: 20}}>Minutos:</div>
                                <Field component={renderField}
                                       placeholder="Tempo estimado"
                                       type="number"
                                       name="estimateMinutes"/>
                            </div>
                        </div>
                        <div align="center" className="row">
                            <button disabled={submitting} onClick={handleSubmit(submit)}
                                    className="btn btn-outline-success" style={{width: 248, height: 50}}>Novo Serviço
                            </button>
                            <button disabled={submitting} onClick={() => this.props.redirect('/')}
                                    className="btn btn-outline-danger" style={{width: 248, height: 50}}>Cancelar
                            </button>
                        </div>
                    </div>
                    :
                    <div/>
                }
            </div>

        )
    }

}

const mapStateToProps = state => ({
    employeeSelected: state.employees.employeeSelected,
    serviceAdded: state.employees.serviceAdded
});

const mapDispatchToProps = ({
    addServiceInEmployee: addServiceInEmployee,
    redirect: push
});

export default reduxForm({
    form: 'serviceForm',
    validate
})(connect(mapStateToProps, mapDispatchToProps)(RegisterService));