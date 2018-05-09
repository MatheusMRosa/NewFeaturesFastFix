import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {addServiceInEmployee} from './actionsEmployee';
import {connect} from "react-redux";
import {push} from "react-router-redux";

const validate = values => {
    const errors = {};
    if (!values.descService) {
        errors.descService = 'Por Favor insira uma breve descrição sobre o Serviço';
    } else if (!values.estimate) {
        errors.estimate = 'Por Favor informe uma Estimativa de Tempo para a Conclusão do Serviço'
    }
    return errors
};

const renderField = ({input, label, type, meta: {touched, error}}) => (
    <div>
        <input {...input} placeholder={label} type={type} className="form-control"/>
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
            addServiceInEmployee(this.props.employeeSelected, values);
        };
        return (
            <div align="center">
                {this.props.employeeSelected ?
                    <div className="container card" style={{marginTop: 100, width: 700, height: 700}}>
                        <h5 className="card-title">Novo serviço para o
                            funcionário {this.props.employeeSelected.name}</h5>
                        <Field component={renderField}
                               label="Descrição do Serviço"
                               type="text"
                               name="descService"/>
                        <div className="row" align="center">
                            <div>Horário Atual:</div>
                            <div>{new Date().toString()}</div>
                        </div>
                        <div>Estimatima de conclusão:</div>
                        <Field component={renderField}
                               placeholder="Tempo estimado"
                               type="time"
                               name="estimate"/>
                        <button disabled={submitting} onClick={handleSubmit(submit)}
                                className="btn btn-outline-success">Novo Serviço
                        </button>
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