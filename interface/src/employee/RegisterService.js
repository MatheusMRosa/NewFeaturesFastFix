import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {addServiceInEmployee} from './actionsEmployee';
import renderField from './RenderField';
import validate from './ValidateNewService';
import {connect} from "react-redux";
import {push} from "react-router-redux";
import Clock from 'react-live-clock';
import '../config/CSS/registers.css';

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
            if (!values.estimateHours) {
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
                    <div className="container card cardSize">
                        <h5 className="card-title margin">Novo serviço para o
                            funcionário {this.props.employeeSelected.name}</h5>
                        <Field component={renderField}
                               label="Descrição do Serviço"
                               type="text"
                               name="descService"/>
                        <div className="card-body">
                            <div className="row margin" align="center">
                                <div>Horário Atual:</div>
                                <div><Clock format={'HH:mm:ss'} ticking={true}/></div>
                            </div>
                            <div className="margin">Estimatima de conclusão:</div>
                            <div className="row">
                                <div className="margin">Horas:</div>
                                <Field component={renderField}
                                       placeholder="Tempo estimado"
                                       type="number"
                                       name="estimateHours"/>
                            </div>
                            <div className="row">
                                <div className="margin">Minutos:</div>
                                <Field component={renderField}
                                       placeholder="Tempo estimado"
                                       type="number"
                                       name="estimateMinutes"/>
                            </div>
                        </div>
                        <div align="center" className="row card-deck alignSELF">
                            <button disabled={submitting} onClick={handleSubmit(submit)}
                                    className="btn btn-outline-success buttonSize">Novo Serviço
                            </button>
                            <button disabled={submitting} onClick={() => this.props.redirect('/')}
                                    className="btn btn-outline-danger buttonSize">Cancelar
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